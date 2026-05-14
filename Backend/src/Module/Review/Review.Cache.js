import { getCache, setCache, getSignedUrlS3 } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const REVIEW_CACHE_VERSION_KEY = "review:cache:version";
export const REVIEW_LIST_CACHE_PREFIX = "review:list";
export const REVIEW_DETAIL_CACHE_PREFIX = "review:detail";
export const REVIEW_SIGNED_URL_CACHE_PREFIX = "review:signed-url";
export const REVIEW_CACHE_TTL = 3600;

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
	const version = await safeRedisGet(REVIEW_CACHE_VERSION_KEY);
	return version || "0";
};

export const invalidateReviewCache = async () => {
	await safeRedisIncr(REVIEW_CACHE_VERSION_KEY);
};

export const getCachedSignedUrl = async (fileUrl) => {
	if (!fileUrl) return fileUrl;

	const cacheKey = `${REVIEW_SIGNED_URL_CACHE_PREFIX}:${fileUrl}`;
	const cachedUrl = await getCache(cacheKey);
	if (cachedUrl) return cachedUrl;

	const signedUrl = await getSignedUrlS3(fileUrl);
	if (signedUrl && signedUrl !== fileUrl) {
		await setCache(cacheKey, signedUrl, REVIEW_CACHE_TTL);
	}

	return signedUrl;
};

export default {
	REVIEW_CACHE_VERSION_KEY,
	REVIEW_LIST_CACHE_PREFIX,
	REVIEW_DETAIL_CACHE_PREFIX,
	REVIEW_SIGNED_URL_CACHE_PREFIX,
	REVIEW_CACHE_TTL,
	getCacheVersion,
	invalidateReviewCache,
	getCachedSignedUrl,
};
