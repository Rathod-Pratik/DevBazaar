import { getCache, setCache } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const WISHLIST_CACHE_VERSION_KEY = "wishlist:cache:version";
export const WISHLIST_LIST_CACHE_PREFIX = "wishlist:list";
export const WISHLIST_DETAIL_CACHE_PREFIX = "wishlist:detail";
export const WISHLIST_CACHE_TTL = 3600;

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
	const version = await safeRedisGet(WISHLIST_CACHE_VERSION_KEY);
	return version || "0";
};

export const invalidateWishListCache = async () => {
	await safeRedisIncr(WISHLIST_CACHE_VERSION_KEY);
};

export default {
	WISHLIST_CACHE_VERSION_KEY,
	WISHLIST_LIST_CACHE_PREFIX,
	WISHLIST_DETAIL_CACHE_PREFIX,
	WISHLIST_CACHE_TTL,
	getCacheVersion,
	invalidateWishListCache,
};
