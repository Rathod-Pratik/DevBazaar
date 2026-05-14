import { getCache, setCache, getSignedUrlS3 } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const ORDER_CACHE_VERSION_KEY = "order:cache:version";
export const ORDER_LIST_CACHE_PREFIX = "order:list";
export const ORDER_DETAIL_CACHE_PREFIX = "order:detail";
export const ORDER_SIGNED_URL_CACHE_PREFIX = "order:signed-url";
export const ORDER_CACHE_TTL = 3600;

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
	const version = await safeRedisGet(ORDER_CACHE_VERSION_KEY);
	return version || "0";
};

export const invalidateOrderCache = async () => {
	await safeRedisIncr(ORDER_CACHE_VERSION_KEY);
};

export const getCachedSignedUrl = async (fileUrl) => {
	if (!fileUrl) return fileUrl;

	const cacheKey = `${ORDER_SIGNED_URL_CACHE_PREFIX}:${fileUrl}`;
	const cachedUrl = await getCache(cacheKey);
	if (cachedUrl) return cachedUrl;

	const signedUrl = await getSignedUrlS3(fileUrl);
	if (signedUrl && signedUrl !== fileUrl) {
		await setCache(cacheKey, signedUrl, ORDER_CACHE_TTL);
	}

	return signedUrl;
};

export default {
	ORDER_CACHE_VERSION_KEY,
	ORDER_LIST_CACHE_PREFIX,
	ORDER_DETAIL_CACHE_PREFIX,
	ORDER_SIGNED_URL_CACHE_PREFIX,
	ORDER_CACHE_TTL,
	getCacheVersion,
	invalidateOrderCache,
	getCachedSignedUrl,
};
