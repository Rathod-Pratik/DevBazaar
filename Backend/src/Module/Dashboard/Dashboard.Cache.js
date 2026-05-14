import { getCache, setCache } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const DASHBOARD_CACHE_VERSION_KEY = "dashboard:cache:version";
export const DASHBOARD_CACHE_PREFIX = "dashboard:stats";
export const DASHBOARD_CACHE_TTL = 300;

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
  const version = await safeRedisGet(DASHBOARD_CACHE_VERSION_KEY);
  return version || "0";
};

export const invalidateDashboardCache = async () => {
  await safeRedisIncr(DASHBOARD_CACHE_VERSION_KEY);
};

export default {
  DASHBOARD_CACHE_VERSION_KEY,
  DASHBOARD_CACHE_PREFIX,
  DASHBOARD_CACHE_TTL,
  getCacheVersion,
  invalidateDashboardCache,
};
