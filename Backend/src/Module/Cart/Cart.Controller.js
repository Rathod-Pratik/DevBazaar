import CartModel from "./Cart.Model.js";
import {
  addToCartSchema,
  getCartSchema,
  removeItemSchema,
  validateCartRequest,
} from "./Cart.Validation.js";
import { getCache, setCache } from "../../Utils/Function.js";
import { CART_CACHE_TTL, CART_LIST_CACHE_PREFIX, getCacheVersion, invalidateCartCache } from "./Cart.Cache.js";
import { getCachedSignedUrl } from "../Product/Product.Cache.js";

export const AddToCart = async (req, res) => {
  try {
    const validation = validateCartRequest(addToCartSchema, req.body);

    if (!validation.success) {
      return res.status(400).json({ error: validation.message });
    }

    const { user, product } = validation.data;
    const productExists = await CartModel.findOne({
      user,
      product,
    });

    if (productExists) {
      return res
        .status(200)
        .json({AlreadyInCart:true, error: "Product already exists in the Cart" });
    }
    
    const AddToCart = await CartModel.create({ user, product });

    if (AddToCart) {
      await invalidateCartCache();
      return res.status(201).json({data:AddToCart, message: "Product added to Cart" });
    } else {
      return res.status(400).json({ message: "Product failed to add to Cart" });
    }
  } catch (error) {
    console.error("Error adding to Cart:", error.message); 
    return res.status(500).json({ error: "Internal Server Error" }); 
  }
};

export async function RemoveItem(req, res) {
 
  const validation = validateCartRequest(removeItemSchema, req.query);

  if (!validation.success) {
    return res.status(400).json({ error: validation.message });
  }

  const { user, product } = validation.data;

  try {
    const deleteCart = await CartModel.deleteOne({ user, product });

    if (deleteCart.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found in the Cart" });
    }
    await invalidateCartCache();

    return res.status(200).json({ message: "Product removed from the Cart" });
  } catch (error) {
    console.error("Error deleting from Cart:", error.message); 
    return res.status(500).json({ error: "Internal Server Error" }); 
  }
}

export async function GetCart(req, res) {
  const validation = validateCartRequest(getCartSchema, req.query);

  if (!validation.success) {
    return res.status(400).json({ error: validation.message });
  }

  const { user } = validation.data;

  try {
    const version = await getCacheVersion();
    const cacheKey = `${CART_LIST_CACHE_PREFIX}:v${version}:user:${user}`;
    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).json(cached);

    const cartRaw = await CartModel.find({ user }).populate("product", "Product_name Price discount image").populate("user");

    if (!cartRaw || cartRaw.length === 0) {
      const resp = { cart: [] };
      await setCache(cacheKey, resp, CART_CACHE_TTL);
      return res.status(200).json(resp);
    }

    const cart = await Promise.all((cartRaw || []).map(async (c) => {
      const obj = c.toObject ? c.toObject() : c;
      if (obj.product) {
        const imageKeys = Array.isArray(obj.product.image) ? obj.product.image : [];
        obj.product.image = await Promise.all(
          imageKeys.map(async (key) => ({ key, url: await getCachedSignedUrl(key) }))
        );
      }
      return obj;
    }));

    const resp = { cart };
    await setCache(cacheKey, resp, CART_CACHE_TTL);
    return res.status(200).json(resp);
  } catch (error) {
    console.error("Error getting Cart:", error.message); 
    return res.status(500).json({ error: "Internal Server Error" }); 
  }
}
