import WishList from "./WishList.Model.js";
import {
  wishListCreateSchema,
  wishListRemoveSchema,
  wishListUserSchema,
} from "./WishList.validation.js";
import { getCache, setCache } from "../../Utils/Function.js";
import { WISHLIST_CACHE_TTL, WISHLIST_LIST_CACHE_PREFIX, getCacheVersion, invalidateWishListCache } from "./WishList.Cache.js";
import { getCachedSignedUrl } from "../Product/Product.Cache.js";

const formatValidationErrors = (error) =>
  error.issues.map((issue) => issue.message).join(", ");

export async function RemoveItem(req, res) {
  const validation = wishListRemoveSchema.safeParse({
    userId: req.query.userId ?? req.body?.userId,
    productId: req.query.productId ?? req.body?.productId,
  });

  if (!validation.success) {
    return res.status(400).json({ message: formatValidationErrors(validation.error) });
  }

  const { userId, productId } = validation.data;

  try {
    const deleteWishList = await WishList.deleteOne({ userId, productId });

    if (deleteWishList.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found in the wish list" });
    }

    await invalidateWishListCache();

    return res.status(200).json({ message: "Product removed from the wish list" });
  } catch (error) {
    console.error("Error deleting from wishlist:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function AddToWishList(req, res) {
  const validation = wishListCreateSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ message: formatValidationErrors(validation.error) });
  }

  const { userId, productId } = validation.data;

  try {
    const productExists = await WishList.findOne({ userId, productId });

    if (productExists) {
      return res.status(409).json({ error: "Product already exists in the wishlist" });
    }

    const addToWishList = await WishList.create({
      userId,
      productId,
    });

    await invalidateWishListCache();

    return res.status(201).json({
      message: "Product added to WishList",
      wishList: addToWishList,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getWishList(req, res) {
  const validation = wishListUserSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ message: formatValidationErrors(validation.error) });
  }

  const { userId } = validation.data;

  try {
    const version = await getCacheVersion();
    const cacheKey = `${WISHLIST_LIST_CACHE_PREFIX}:v${version}:user:${userId}`;
    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).json(cached);

    const wishListRaw = await WishList.find({ userId }).populate("productId", "Product_name Price discount image").populate("userId");

    const wishList = await Promise.all(
      (wishListRaw || []).map(async (w) => {
        const obj = w.toObject ? w.toObject() : w;
        if (obj.productId) {
          const imageKeys = Array.isArray(obj.productId.image) ? obj.productId.image : [];
          obj.productId.image = await Promise.all(
            imageKeys.map(async (key) => ({ key, url: await getCachedSignedUrl(key) }))
          );
        }
        return obj;
      })
    );

    const resp = { wishList };
    await setCache(cacheKey, resp, WISHLIST_CACHE_TTL);
    return res.status(200).json(resp);
  } catch (error) {
    console.error("Error getting wishlist:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
