const CartModel = require("../model/CartModel");

const AddToCart = async (req, res) => {
  try {
    const { user, Product_name, product_image_url, Price ,reting} = req.body;

    // Validate required fields
    if (!user || !Product_name || !product_image_url || !Price || !reting) {
      return res
        .status(400)
        .json({ error: "All the Product data is required" });
    }

    // Add product to cart
    const AddToCart = await CartModel.create({
      user,
      Product_name,
      product_image_url,
      Price,
      reting
    });

    // Check if the product was added successfully
    if (AddToCart) {
      return res.status(201).json({ message: "Product added to Cart" });
    } else {
      return res.status(400).json({ message: "Product failed to add to Cart" });
    }
  } catch (error) {
    console.error("Error adding to Cart:", error.message); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Handle unexpected errors
  }
};

async function RemoveItem(req, res) {
  // Change to DELETE for deleting data
  const { user, Product_name } = req.query;

  if (!user || !Product_name) {
    return res
      .status(400)
      .json({ error: "User and Product Name are required" });
  }

  try {
    const deleteCart = await CartModel.deleteOne({ user, Product_name });

    if (deleteCart.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found in the Cart" });
    }

    return res.status(200).json({ message: "Product removed from the Cart" });
  } catch (error) {
    console.error("Error deleting from Cart:", error.message); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Handle unexpected errors
  }
}

async function GetCart(req, res) {
  // Change to GET for reading data

  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "User is required" });
  }

  try {
    const cart = await CartModel.find({ user });

    if (cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting Cart:", error.message); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Handle unexpected errors
  }
}

module.exports = { AddToCart, RemoveItem, GetCart };