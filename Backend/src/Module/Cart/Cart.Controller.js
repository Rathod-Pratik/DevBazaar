import CartModel from "./Cart.Model.js";
import {
  addToCartSchema,
  getCartSchema,
  removeItemSchema,
  validateCartRequest,
} from "./Cart.Validation.js";

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
    const cart = await CartModel.find({ user });

    if (cart.length === 0) {
      return res.status(200).json({ message: "Cart is empty" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting Cart:", error.message); 
    return res.status(500).json({ error: "Internal Server Error" }); 
  }
}
