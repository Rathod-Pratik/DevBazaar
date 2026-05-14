import PaymentModel from "../Payment/Payment.Model.js";
import User from "../Auth/Auth.Model.js";
import { getCache, setCache } from "../../Utils/Function.js";
import { DASHBOARD_CACHE_TTL, DASHBOARD_CACHE_PREFIX, getCacheVersion } from "./Dashboard.Cache.js";

export const GetDashboardStats = async (req, res) => {
  try {
    const version = await getCacheVersion();
    const cacheKey = `${DASHBOARD_CACHE_PREFIX}:v${version}:status:${req.query.status || "all"}:page:${page}:limit:${limit}`;
    const cached = await getCache(cacheKey);
    if (cached) return res.status(200).json(cached);
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const paymentFilter = {};
    if (req.query.status) {
      paymentFilter.status = req.query.status;
    }

    const [
      users,
      totalPayments,
      payments,
      revenueAgg,
      orderAgg,
    ] = await Promise.all([
      User.find({ role: "user", isDelete: { $ne: true } }).select("-password -otp"),
      PaymentModel.countDocuments(paymentFilter),
      PaymentModel.find(paymentFilter)
        .populate("orderId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      PaymentModel.aggregate([
        { $match: { status: "verified" } },
        { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
      ]),
      PaymentModel.aggregate([
        { $match: { orderId: { $ne: null } } },
        { $group: { _id: "$orderId" } },
        { $count: "totalOrders" },
      ]),
    ]);

    const totalRevenue = Number(revenueAgg?.[0]?.totalRevenue || 0) / 100;
    const totalOrders = Number(orderAgg?.[0]?.totalOrders || 0);
    const totalPages = Math.ceil(totalPayments / limit);

    const resp = {
      totalRevenue,
      totalUsers: users.length,
      users,
      order: totalOrders,
      payments,
      pagination: {
        page,
        limit,
        total: totalPayments,
        totalPages,
      },
    };

    await setCache(cacheKey, resp, DASHBOARD_CACHE_TTL);
    return res.status(200).json(resp);
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};