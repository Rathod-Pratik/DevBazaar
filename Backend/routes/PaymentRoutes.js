import express from 'express';
import { verifyOrder,createOrder, Refund } from '../controller/PaymentController.js'

const route=express.Router();

route.post('/create-order',createOrder);
route.post('/verify-order',verifyOrder);
route.post('/refund',Refund);

export default route;