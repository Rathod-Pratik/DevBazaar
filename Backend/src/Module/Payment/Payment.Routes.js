import express from 'express';
import { verifyOrder, createOrder, Refund, GetPaymentData } from './Payment.Controller.js'
import { verifyAdmin, verifyUser } from '../../Middleware/Auth.middleware.js';

const route=express.Router();

route.post('/create-order',verifyUser,createOrder);
route.post('/verify-order',verifyUser,verifyOrder);
route.post('/refund',verifyAdmin,Refund);
route.get('/payment-data', verifyAdmin, GetPaymentData);

export default route;