import express from 'express'
import {  GetOrder, CancelOrder, CreateOrder }  from  '../controller/OrderController.js';
const router=express.Router();

router.post('/CancelOrder',CancelOrder);
router.get('/getorder',GetOrder);
router.post('/CreateOrder',CreateOrder);
export default router;