const express=require('express');
const {  GetOrder, CancelOrder } = require('../controller/OrderController');
const router=express.Router();
router.post('/CancelOrder',CancelOrder);
router.get('/getorder',GetOrder);

module.exports=router;