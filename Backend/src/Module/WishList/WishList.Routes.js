import express from 'express'
import { RemoveItem, AddToWishList, getWishList } from "./WishList.Controller.js";
import { verifyUser } from '@middleware/Auth.middleware.js';

const router = express.Router();

router.post("/getWishList",verifyUser,getWishList);
router.delete("/deleteFromWishList", verifyUser, RemoveItem);
router.post("/addToWishList", verifyUser, AddToWishList);
  
export default router;