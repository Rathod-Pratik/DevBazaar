import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToMongo } from '../Utils/Connection.js';
import Razorpay from 'razorpay';
import jwt from "jsonwebtoken";

// Routes
import AuthRoutes from '../Module/Auth/Auth.Routes.js';
import WishListRoute from '../Module/WishList/WishList.Routes.js';
import ProductRoutes from '../Module/Product/Product.Routes.js';
import CartRoute from '../Module/Cart/Cart.Routes.js';
import ContectRoutes from '../Module/Contact/Contect.Routes.js';
import ProfileRoutes from '../Module/Profile/Profile.Routes.js';
import OrderRoutes from '../Module/Order/Order.Routes.js';
import paymentRoutes from '../Module/Payment/Payment.Routes.js';
import CategoryRoutes from '../Module/Category/Category.Routes.js';
import DashBoardRoutes from '../Module/Dashboard/Dashboard.Routes.js';
import ReviewRoutes from '../Module/Review/Review.Routes.js';
import HomeContentRoutes from '../Module/Home/Home.Routes.js';
import AboutContentRoutes from '../Module/About/About.Routes.js';
import VoucherRoutes from '../Module/Voucher/Voucher.Routes.js';

import dotenv from 'dotenv';
dotenv.config();

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZERPAY_API_KEY,
  key_secret: process.env.RAZERPAY_API_SECRET,
});

connectToMongo(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const app = express();
app.use(cookieParser());

// CORS options
const corsOptions = {
  origin: [process.env.FRONTEND],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', AuthRoutes);
app.use('/wishList', WishListRoute);
app.use('/Product', ProductRoutes);
app.use('/Cart', CartRoute);
app.use('/Contect', ContectRoutes);
app.use('/Profile', ProfileRoutes);
app.use('/order', OrderRoutes);
app.use('/payment', paymentRoutes);
app.use('/category', CategoryRoutes);
app.use('/dashboard', DashBoardRoutes);
app.use('/review', ReviewRoutes);
app.use('/home', HomeContentRoutes);
app.use('/about', AboutContentRoutes);
app.use('/voucher', VoucherRoutes);

app.get("/auth/check", (req, res) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.status(200).json({ isAuth: false });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "admin") {
      return res.status(200).json({ isAuth: true, role: "admin" });
    } else {
      return res.status(200).json({ isAuth: false, role: decoded.role });
    }
  } catch (err) {
    console.error("Invalid token:", err.message);
    return res.status(200).json({ isAuth: false });
  }
});

export default app
