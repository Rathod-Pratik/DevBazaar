import redis from "../Utils/Redis.js";

const defaultWindowSeconds = Number(process.env.RATE_LIMIT_WINDOW_SECONDS || 900);
const defaultLimit = Number(process.env.RATE_LIMIT_MAX || 100);

const getClientKey = (req, prefix = "rate-limit") => {
	const forwardedFor = req.headers["x-forwarded-for"];
	const forwardedIp = Array.isArray(forwardedFor)
		? forwardedFor[0]
		: typeof forwardedFor === "string"
			? forwardedFor.split(",")[0].trim()
			: null;

	const ip = forwardedIp || req.ip || req.socket?.remoteAddress || "unknown";
	const route = req.originalUrl || req.baseUrl || req.path || "global";
	return `${prefix}:${route}:${ip}`;
};

export const createRateLimiter = ({
	windowSeconds = defaultWindowSeconds,
	limit = defaultLimit,
	prefix = "rate-limit",
} = {}) => {
	return async (req, res, next) => {
		try {
			const key = getClientKey(req, prefix);
			const count = await redis.incr(key);

			if (count === 1) {
				await redis.expire(key, windowSeconds);
			}

			if (count > limit) {
				const ttl = await redis.ttl(key);
				if (ttl > 0) {
					res.setHeader("Retry-After", String(ttl));
				}

				return res.status(429).json({
					error: "Too many requests",
					message: "Rate limit exceeded. Please try again later.",
				});
			}

			res.setHeader("X-RateLimit-Limit", String(limit));
			res.setHeader("X-RateLimit-Remaining", String(Math.max(limit - count, 0)));
			res.setHeader("X-RateLimit-Reset", String(windowSeconds));

			return next();
		} catch (error) {
			return next(error);
		}
	};
};

export const authRateLimiter = createRateLimiter({
	prefix: "rate-limit:auth",
	windowSeconds: Number(process.env.AUTH_RATE_LIMIT_WINDOW_SECONDS || 900),
	limit: Number(process.env.AUTH_RATE_LIMIT_MAX || 10),
});

export const otpRateLimiter = createRateLimiter({
	prefix: "rate-limit:otp",
	windowSeconds: Number(process.env.OTP_RATE_LIMIT_WINDOW_SECONDS || 900),
	limit: Number(process.env.OTP_RATE_LIMIT_MAX || 5),
});
