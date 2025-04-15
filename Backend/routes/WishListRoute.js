import express from 'express'
import { RemoveItem, AddToWishList, getWishList } from "../controller/WishListController.js";

const router = express.Router();

router.post("/getWishList",getWishList);
router.delete("/deleteFromWishList", RemoveItem);
router.post("/addToWishList", AddToWishList);
  
export default router;
