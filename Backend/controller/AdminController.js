import axios from "axios";
import OrderModel from "../model/OrderModel.js";
import User from "../model/UserModel.js";

export const Stats = async (req, res) => {
    try {
      // Fetch payment data from Razorpay
      const response = await axios.get("https://api.razorpay.com/v1/payments", {
        auth: {
          username: process.env.RAZERPAY_API_KEY,
          password: process.env.RAZERPAY_API_SECRET,
        },
      });
  
      // Extract successful payments and calculate revenue
      const payments = response.data.items;
      const totalRevenue = payments
        .filter((payment) => payment.status === "captured")
        .reduce((sum, payment) => sum + payment.amount / 100, 0);
  
      const users = await User.find();
      const order = await OrderModel.find({status:"success"});
  
      res.status(200).json({
        totalRevenue,
        totalUsers: users.length - 1,
        users,
        order:order.length,
        payments // ✅ Send payment history here
      });
      
    } catch (error) {
      console.error("Razorpay API Error:", error);
      return res.status(502).json({ error: "Failed to fetch data from Razorpay" });
    }
  };