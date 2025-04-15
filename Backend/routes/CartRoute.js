import express from 'express'
import {AddToCart,RemoveItem,GetCart,UpdateQuantity} from '../controller/CartController.js';

const router=express.Router();

router.post('/addToCart',AddToCart);
router.delete('/deleteFromCart',RemoveItem);
router.get('/getCart',GetCart);
router.post('/updateQuantity',UpdateQuantity)

export default router;