const express=require('express');
const {AddToCart,RemoveItem,GetCart}=require('../controller/CartController');
const { route } = require('./WishListRoute');

const router=express.Router();

router.post('/addToCart',AddToCart);
router.delete('/deleteFromCart',RemoveItem);
router.get('/getCart',GetCart);

module.exports=router;