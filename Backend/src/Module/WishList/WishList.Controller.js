import WishList from "./WishList.Model.js";
import {
  wishListCreateSchema,
  wishListRemoveSchema,
  wishListUserSchema,
} from "./WishList.validation.js";

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
    const wishList = await WishList.find({ userId }).populate("productId").populate("userId");
    return res.status(200).json({ wishList });
  } catch (error) {
    console.error("Error getting wishlist:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
