import express from 'express'
import {  GetOrder, CancelOrder, CreateOrder, GetCancelOrder, GetAllOrder }  from  '../controller/OrderController.js';
const router=express.Router();

router.post('/CancelOrder',CancelOrder);
router.get('/getorder/:user',GetOrder);
router.post('/CreateOrder',CreateOrder);
router.get('/getallorder',GetAllOrder)
router.get('/GetCancelOrder/:user',GetCancelOrder);

export default router;