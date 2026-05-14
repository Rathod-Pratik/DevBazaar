import { getCache, setCache } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const CART_CACHE_VERSION_KEY = "cart:cache:version";
export const CART_LIST_CACHE_PREFIX = "cart:list";
export const CART_DETAIL_CACHE_PREFIX = "cart:detail";
export const CART_CACHE_TTL = 3600;

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
	const version = await safeRedisGet(CART_CACHE_VERSION_KEY);
	return version || "0";
};

export const invalidateCartCache = async () => {
	await safeRedisIncr(CART_CACHE_VERSION_KEY);
};

export default {
	CART_CACHE_VERSION_KEY,
	CART_LIST_CACHE_PREFIX,
	CART_DETAIL_CACHE_PREFIX,
	CART_CACHE_TTL,
	getCacheVersion,
	invalidateCartCache,
};
