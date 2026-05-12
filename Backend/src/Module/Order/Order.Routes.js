import express from 'express'
import {  GetOrder, CancelOrder, CreateOrder, GetCancelOrder, GetAllOrder }  from  './OrderController.js';
import { verifyAdmin, verifyUser } from '@middleware/Auth.middleware.js';
const router=express.Router();

router.post('/CancelOrder',verifyUser,CancelOrder);
router.get('/getorder/:user',verifyUser,GetOrder);
router.post('/CreateOrder',verifyUser,CreateOrder);
router.get('/getallorder',verifyAdmin,GetAllOrder)
router.get('/GetCancelOrder/:user',verifyUser,GetCancelOrder);

export default router;