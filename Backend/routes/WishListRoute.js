const express = require("express");
const { RemoveItem, AddToWishList, getWishList } = require("../controller/WishListController");

const router = express.Router();

router.post("/getWishList",getWishList);
router.delete("/deleteFromWishList", RemoveItem);
router.post("/addToWishList", AddToWishList);
  
module.exports = router;
