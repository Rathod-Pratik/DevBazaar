const express=require('express');
const {AddToCart,RemoveItem,GetCart,UpdateQuantity}=require('../controller/CartController');

const router=express.Router();

router.post('/addToCart',AddToCart);
router.delete('/deleteFromCart',RemoveItem);
router.get('/getCart',GetCart);
router.post('/updateQuantity',UpdateQuantity)

module.exports=router;