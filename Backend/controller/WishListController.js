const WishList = require("../model/wishListModel");


async function RemoveItem (req, res){  // Change to DELETE for deleting data
    const { user, Product_name } = req.query;
  
    if (!user || !Product_name) {
      return res.status(400).json({ error: "User and Product Name are required" });
    }
  
    try {
      const deleteWishList = await WishList.deleteOne({ user, Product_name });
  
      if (deleteWishList.deletedCount === 0) {
        return res.status(404).json({ message: "Product not found in the wish list" });
      }
  
      return res.status(200).json({ message: "Product removed from the wish list" });
    } catch (error) {
      console.error("Error deleting from wishlist:", error.message);  // Log the error for debugging
      return res.status(500).json({ error: "Internal Server Error" });  // Handle unexpected errors
    }
  }

  async function AddToWishList (req, res){  // Change to POST for creating data
    try {
      const { user, Product_name, product_image_url, Price,reting } = req.body;
  
      // Validate required fields
      if (!user || !Product_name || !product_image_url || !Price || !reting) {
        return res.status(400).json({ error: "All the Product data is required" });
      }
  
      // Add product to wishlist
      const AddToWishList = await WishList.create({
        user,
        Product_name,
        product_image_url,
        Price,
        reting
      });
  
      // Check if the product was added successfully
      if (AddToWishList) {
        return res.status(201).json({ message: "Product added to WishList" });
      } else {
        return res.status(400).json({ message: "Product failed to add to WishList" });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);  // Log the error for debugging
      return res.status(500).json({ error: "Internal Server Error" });  // Handle unexpected errors
    }
  }

  async function getWishList (req, res){  // Change to GET for reading data

    const { user } = req.query;
  
    if (!user) {
      return res.status(400).json({ error: "User is required" });
    }
  
    try {
      const wishList = await WishList.find({ user });
      return res.status(200).json({ wishList});
    } catch (error) {
      console.error("Error getting wishlist:", error.message);  // Log the error for debugging
    }
  }
  module.exports ={RemoveItem,AddToWishList,getWishList};  