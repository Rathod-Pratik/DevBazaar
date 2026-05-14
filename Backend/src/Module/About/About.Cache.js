import { getCache, setCache, getSignedUrlS3 } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const ABOUT_CACHE_VERSION_KEY = "about:cache:version";
export const ABOUT_CACHE_PREFIX = "about:content";
export const ABOUT_SIGNED_URL_CACHE_PREFIX = "about:signed-url";
export const ABOUT_CACHE_TTL = 3600;

const safeRedisGet = async (key) => {
	try {
		return await redis.get(key);
	} catch (error) {
		return null;
	}
};

const safeRedisIncr = async (key) => {
	try {
		await redis.incr(key);
	} catch (error) {
		return null;
	}
};

export const getCacheVersion = async () => {
	const version = await safeRedisGet(ABOUT_CACHE_VERSION_KEY);
	return version || "0";
};

export const invalidateAboutCache = async () => {
	await safeRedisIncr(ABOUT_CACHE_VERSION_KEY);
};

export const getCachedSignedUrl = async (fileUrl) => {
	if (!fileUrl) return fileUrl;

	const cacheKey = `${ABOUT_SIGNED_URL_CACHE_PREFIX}:${fileUrl}`;
	const cachedUrl = await getCache(cacheKey);
	if (cachedUrl) return cachedUrl;

	const signedUrl = await getSignedUrlS3(fileUrl);
	if (signedUrl && signedUrl !== fileUrl) {
		await setCache(cacheKey, signedUrl, ABOUT_CACHE_TTL);
	}

	return signedUrl;
};

export default {
	ABOUT_CACHE_VERSION_KEY,
	ABOUT_CACHE_PREFIX,
	ABOUT_SIGNED_URL_CACHE_PREFIX,
	ABOUT_CACHE_TTL,
	getCacheVersion,
	invalidateAboutCache,
	getCachedSignedUrl,
};
