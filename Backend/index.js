import express from 'express'
const app=express();
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {connectToMongo} from './controller/Connection.js';
import Razorpay from 'razorpay';

import AuthRoutes from './routes/AuthRoutes.js'
import WishListRoute from './routes/WishListRoute.js'
import BillingRoutes from './routes/BillingRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import CartRoute from './routes/CartRoute.js'
import ContectRoutes from './routes/ContectRoutes.js'
import ProfileRoutes from './routes/ProfileRoutes.js'
import OrderRoutes from './routes/OrderRoutes.js'
import paymentRoutes from './routes/PaymentRoutes.js'
import CategoryRoutes from './routes/CategoryRoutes.js'
import AdminRoutes from './routes/AdminRoutes.js'
import ReviewRoutes from './routes/ReviewRoutes.js'

import dotenv from 'dotenv'
dotenv.config()

export const razorpayInstance =new Razorpay({
    key_id:process.env.RAZERPAY_API_KEY,
    key_secret:process.env.RAZERPAY_API_SECRET
})

connectToMongo(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); 
    });


    const corsOptions = {
        origin: [process.env.FRONTEND],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    };
    
    app.use(cors(corsOptions));
    
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.use('/api',AuthRoutes);
app.use('/wishList',WishListRoute)
app.use('/Billing',BillingRoutes);
app.use('/Product',ProductRoutes);
app.use('/Cart',CartRoute);
app.use('/Contect',ContectRoutes);
app.use('/Profile',ProfileRoutes);
app.use('/order',OrderRoutes)
app.use('/payment',paymentRoutes)
app.use('/category',CategoryRoutes)
app.use('/Admin',AdminRoutes),
app.use('/review',ReviewRoutes)

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});