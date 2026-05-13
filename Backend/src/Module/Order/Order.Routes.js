import express from 'express'
import {  GetOrder, CancelOrder, CreateOrder, GetOrderById, GetAllOrder }  from  './Order.Controller.js';
import { verifyAdmin, verifyUser } from '../../Middleware/Auth.middleware.js';
const router=express.Router();

router.post('/CancelOrder',verifyUser,CancelOrder);
router.get('/getorder/:user',verifyUser,GetOrder);
router.post('/CreateOrder',verifyUser,CreateOrder);

router.get('/getallorder',verifyAdmin,GetAllOrder);
export default router;