import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToMongo } from '../controller/Connection.js';
import Razorpay from 'razorpay';
import jwt from "jsonwebtoken";

// Routes
import AuthRoutes from '../routes/AuthRoutes.js';
import WishListRoute from '../routes/WishListRoute.js';
import BillingRoutes from '../routes/BillingRoutes.js';
import ProductRoutes from '../routes/ProductRoutes.js';
import CartRoute from '../routes/CartRoute.js';
import ContectRoutes from '../routes/ContectRoutes.js';
import ProfileRoutes from '../routes/ProfileRoutes.js';
import OrderRoutes from '../routes/OrderRoutes.js';
import paymentRoutes from '../routes/PaymentRoutes.js';
import CategoryRoutes from '../routes/CategoryRoutes.js';
import AdminRoutes from '../routes/AdminRoutes.js';
import ReviewRoutes from '../routes/ReviewRoutes.js';
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
app.use('/Billing', BillingRoutes);
app.use('/Product', ProductRoutes);
app.use('/Cart', CartRoute);
app.use('/Contect', ContectRoutes);
app.use('/Profile', ProfileRoutes);
app.use('/order', OrderRoutes);
app.use('/payment', paymentRoutes);
app.use('/category', CategoryRoutes);
app.use('/Admin', AdminRoutes);
app.use('/review', ReviewRoutes);

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
