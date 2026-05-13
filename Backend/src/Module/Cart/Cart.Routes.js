import express from 'express'
import {AddToCart,RemoveItem,GetCart} from './Cart.Controller.js';
import { verifyUser } from '../../Middleware/Auth.middleware.js';

const router=express.Router();

router.post('/addToCart',verifyUser,AddToCart);
router.delete('/deleteFromCart',verifyUser,RemoveItem);
router.get('/getCart',verifyUser,GetCart);

export default router;