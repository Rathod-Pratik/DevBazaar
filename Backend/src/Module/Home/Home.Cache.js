import { getCache, setCache, getSignedUrlS3 } from "../../Utils/Function.js";
import redis from "../../Utils/Redis.js";

export const HOME_CACHE_VERSION_KEY = "home:cache:version";
export const HOME_CACHE_PREFIX = "home:content";
export const HOME_SIGNED_URL_CACHE_PREFIX = "home:signed-url";
export const HOME_CACHE_TTL = 3600;

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
  const version = await safeRedisGet(HOME_CACHE_VERSION_KEY);
  return version || "0";
};

export const invalidateHomeCache = async () => {
  await safeRedisIncr(HOME_CACHE_VERSION_KEY);
};

export const getCachedSignedUrl = async (fileUrl) => {
  if (!fileUrl) return fileUrl;

  const cacheKey = `${HOME_SIGNED_URL_CACHE_PREFIX}:${fileUrl}`;
  const cachedUrl = await getCache(cacheKey);
  if (cachedUrl) return cachedUrl;

  const signedUrl = await getSignedUrlS3(fileUrl);
  if (signedUrl && signedUrl !== fileUrl) {
    await setCache(cacheKey, signedUrl, HOME_CACHE_TTL);
  }

  return signedUrl;
};

export default {
  HOME_CACHE_VERSION_KEY,
  HOME_CACHE_PREFIX,
  HOME_SIGNED_URL_CACHE_PREFIX,
  HOME_CACHE_TTL,
  getCacheVersion,
  invalidateHomeCache,
  getCachedSignedUrl,
};
