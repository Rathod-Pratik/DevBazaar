const CartModel = require("../model/CartModel");

const AddToCart = async (req, res) => {
  try {
    const { user, Product_name, Product_image, Price ,Original_Price} = req.body;

    // Validate required fields
    if (!user || !Product_name || !Product_image || !Price  || !Original_Price) {
      return res
        .status(400)
        .json({ error: "All the Product data is required" });
    }
    const productExists = await CartModel.findOne({
      user: user,
      Product_name: Product_name,
    });

    if (productExists) {
      return res
        .status(409)
        .json({ error: "Product already exists in the wishlist" });
    }
    // Add product to cart
    const AddToCart = await CartModel.create({
      Original_Price,
      user,
      Product_name,
      Product_image,
      Price
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
      return res.status(200).json({ message: "Cart is empty" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting Cart:", error.message); // Log the error for debugging
    return res.status(500).json({ error: "Internal Server Error" }); // Handle unexpected errors
  }
}
async function UpdateQuantity(req, res) {
  try {
    // Destructure data from the request body
    const { quantity, user, product_name } = req.body;

    // Validate required fields
    if (!quantity) {
      return res.status(400).json({ message: "Quantity is required" });
    }
    if (!user) {
      return res.status(400).json({ message: "User is required" });
    }
    if (!product_name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    // Update the cart
    const updateCart = await CartModel.findOneAndUpdate(
      { user, product_name },
      { quantity }, // Update quantity
      { new: true } // Return the updated document
    );

    // Check if the cart item exists
    if (!updateCart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Respond with the updated cart item
    return res.status(200).json({ updateCart });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}


module.exports = { AddToCart, RemoveItem, GetCart,UpdateQuantity };