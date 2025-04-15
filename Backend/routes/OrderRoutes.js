import express from 'express'
import {  GetOrder, CancelOrder }  from  '../controller/OrderController.js';
const router=express.Router();
router.post('/CancelOrder',CancelOrder);
router.get('/getorder',GetOrder);

export default router;