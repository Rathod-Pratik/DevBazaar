import { getCache, setCache, getSignedUrlS3 } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const PRODUCT_CACHE_VERSION_KEY = "product:cache:version";
export const PRODUCT_LIST_CACHE_PREFIX = "product:list";
export const PRODUCT_DETAIL_CACHE_PREFIX = "product:detail";
export const PRODUCT_SIGNED_URL_CACHE_PREFIX = "product:signed-url";
export const PRODUCT_CACHE_TTL = 3600;

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
	const version = await safeRedisGet(PRODUCT_CACHE_VERSION_KEY);
	return version || "0";
};

export const invalidateProductCache = async () => {
	await safeRedisIncr(PRODUCT_CACHE_VERSION_KEY);
};

export const getCachedSignedUrl = async (fileUrl) => {
	if (!fileUrl) return fileUrl;

	const cacheKey = `${PRODUCT_SIGNED_URL_CACHE_PREFIX}:${fileUrl}`;
	const cachedUrl = await getCache(cacheKey);
	if (cachedUrl) return cachedUrl;

	const signedUrl = await getSignedUrlS3(fileUrl);
	if (signedUrl && signedUrl !== fileUrl) {
		await setCache(cacheKey, signedUrl, PRODUCT_CACHE_TTL);
	}

	return signedUrl;
};

export default {
	PRODUCT_CACHE_VERSION_KEY,
	PRODUCT_LIST_CACHE_PREFIX,
	PRODUCT_DETAIL_CACHE_PREFIX,
	PRODUCT_SIGNED_URL_CACHE_PREFIX,
	PRODUCT_CACHE_TTL,
	getCacheVersion,
	invalidateProductCache,
	getCachedSignedUrl,
};
