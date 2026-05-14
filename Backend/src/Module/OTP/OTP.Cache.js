import { getCache, setCache } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const OTP_CACHE_PREFIX = "otp:reset";
export const OTP_VERIFIED_PREFIX = "otp:verified";
export const OTP_CACHE_TTL = 600;

const safeRedisSet = async (key, value, ttlSeconds) => {
	try {
		if (ttlSeconds) {
			return await redis.set(key, value, "EX", ttlSeconds);
		}
		return await redis.set(key, value);
	} catch (error) {
		return null;
	}
};

const safeRedisGet = async (key) => {
	try {
		return await redis.get(key);
	} catch (error) {
		return null;
	}
};

const safeRedisDel = async (key) => {
	try {
		return await redis.del(key);
	} catch (error) {
		return null;
	}
};

export const otpCacheKey = (email) => `${OTP_CACHE_PREFIX}:${String(email).toLowerCase()}`;
export const otpVerifiedKey = (email) => `${OTP_VERIFIED_PREFIX}:${String(email).toLowerCase()}`;

export const setOtpCache = async (email, otp) => {
	await safeRedisSet(otpCacheKey(email), otp, OTP_CACHE_TTL);
};

export const getOtpCache = async (email) => {
	return await safeRedisGet(otpCacheKey(email));
};

export const deleteOtpCache = async (email) => {
	await safeRedisDel(otpCacheKey(email));
};

export const setOtpVerified = async (email) => {
	await safeRedisSet(otpVerifiedKey(email), "1", OTP_CACHE_TTL);
};

export const isOtpVerified = async (email) => {
	return Boolean(await safeRedisGet(otpVerifiedKey(email)));
};

export const clearOtpVerified = async (email) => {
	await safeRedisDel(otpVerifiedKey(email));
};
