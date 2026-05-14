import { getCache, setCache, getSignedUrlS3 } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const CATEGORY_CACHE_VERSION_KEY = "category:cache:version";
export const CATEGORY_LIST_CACHE_PREFIX = "category:list";
export const CATEGORY_DETAIL_CACHE_PREFIX = "category:detail";
export const CATEGORY_SIGNED_URL_CACHE_PREFIX = "category:signed-url";
export const CATEGORY_CACHE_TTL = 3600;

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
	const version = await safeRedisGet(CATEGORY_CACHE_VERSION_KEY);
	return version || "0";
};

export const invalidateCategoryCache = async () => {
	await safeRedisIncr(CATEGORY_CACHE_VERSION_KEY);
};

export const getCachedSignedUrl = async (fileUrl) => {
	if (!fileUrl) return fileUrl;

	const cacheKey = `${CATEGORY_SIGNED_URL_CACHE_PREFIX}:${fileUrl}`;
	const cachedUrl = await getCache(cacheKey);
	if (cachedUrl) return cachedUrl;

	const signedUrl = await getSignedUrlS3(fileUrl);
	if (signedUrl && signedUrl !== fileUrl) {
		await setCache(cacheKey, signedUrl, CATEGORY_CACHE_TTL);
	}

	return signedUrl;
};

export default {
	CATEGORY_CACHE_VERSION_KEY,
	CATEGORY_LIST_CACHE_PREFIX,
	CATEGORY_DETAIL_CACHE_PREFIX,
	CATEGORY_SIGNED_URL_CACHE_PREFIX,
	CATEGORY_CACHE_TTL,
	getCacheVersion,
	invalidateCategoryCache,
	getCachedSignedUrl,
};
