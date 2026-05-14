import { getCache, setCache } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const WALLET_CACHE_VERSION_KEY = "wallet:cache:version";
export const WALLET_BALANCE_CACHE_PREFIX = "wallet:balance";
export const WALLET_CACHE_TTL = 300; // short TTL for balances

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
  const version = await safeRedisGet(WALLET_CACHE_VERSION_KEY);
  return version || "0";
};

export const invalidateWalletCache = async () => {
  await safeRedisIncr(WALLET_CACHE_VERSION_KEY);
};

export const getCachedBalance = async (userId) => {
  const version = await getCacheVersion();
  const key = `${WALLET_BALANCE_CACHE_PREFIX}:v${version}:user:${userId}`;
  const cached = await getCache(key);
  return cached ? JSON.parse(cached) : null;
};

export const setCachedBalance = async (userId, data, ttl = WALLET_CACHE_TTL) => {
  const version = await getCacheVersion();
  const key = `${WALLET_BALANCE_CACHE_PREFIX}:v${version}:user:${userId}`;
  await setCache(key, data, ttl);
};

export default {
  WALLET_CACHE_VERSION_KEY,
  WALLET_BALANCE_CACHE_PREFIX,
  WALLET_CACHE_TTL,
  getCacheVersion,
  invalidateWalletCache,
  getCachedBalance,
  setCachedBalance,
};
