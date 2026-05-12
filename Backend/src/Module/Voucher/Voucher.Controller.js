import OrderModel from "../Order/Order.Model.js";
import VoucherModel from "./Voucher.Model.js";
import { applyVoucherSchema, createVoucherSchema, getVoucherQuerySchema, updateVoucherSchema, validate, voucherIdSchema } from "./Voucher.Validation.js";

const calculateDiscount = (order, voucher) => {
  const baseAmount = Number(order?.pricing?.subtotal || 0) + Number(order?.pricing?.tax || 0) + Number(order?.pricing?.shippingCharge || 0);

  let discountAmount = 0;

  if (voucher.type === "percentage") {
    discountAmount = (baseAmount * voucher.value) / 100;
    if (voucher.maxDiscount > 0) {
      discountAmount = Math.min(discountAmount, voucher.maxDiscount);
    }
  } else {
    discountAmount = voucher.value;
  }

  discountAmount = Math.max(0, Math.min(discountAmount, baseAmount));

  return {
    baseAmount,
    discountAmount,
    totalAmount: Math.max(0, baseAmount - discountAmount),
  };
};

export const CreateVoucher = async (req, res) => {
  const validated = validate(createVoucherSchema, req.body);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  try {
    const data = validated.data;
    const code = data.code.toUpperCase();

    const existingVoucher = await VoucherModel.findOne({ code });
    if (existingVoucher) {
      return res.status(400).json({ success: false, message: "Voucher already exists" });
    }

    const voucher = await VoucherModel.create({
      ...data,
      code,
    });

    return res.status(201).json({ success: true, message: "Voucher created successfully", data: voucher });
  } catch (error) {
    console.error("Create voucher error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const GetAllVoucher = async (req, res) => {
  const validated = validate(getVoucherQuerySchema, req.query);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  const { code, active, page, limit } = validated.data;
  const query = {};

  if (code) {
    query.code = code.toUpperCase();
  }

  if (typeof active === "boolean") {
    query.active = active;
  }

  const skip = (page - 1) * limit;

  try {
    const [total, vouchers] = await Promise.all([
      VoucherModel.countDocuments(query),
      VoucherModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);

    return res.status(200).json({
      success: true,
      items: vouchers,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Get voucher error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const GetVoucherById = async (req, res) => {
  const validated = validate(voucherIdSchema, req.params);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  try {
    const voucher = await VoucherModel.findById(validated.data._id);

    if (!voucher) {
      return res.status(404).json({ success: false, message: "Voucher not found" });
    }

    return res.status(200).json({ success: true, data: voucher });
  } catch (error) {
    console.error("Get voucher by id error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const UpdateVoucher = async (req, res) => {
  const validated = validate(updateVoucherSchema, req.body);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  try {
    const { _id, ...updates } = validated.data;

    if (updates.code) {
      updates.code = updates.code.toUpperCase();
      const existingVoucher = await VoucherModel.findOne({ code: updates.code, _id: { $ne: _id } });
      if (existingVoucher) {
        return res.status(400).json({ success: false, message: "Voucher code already exists" });
      }
    }

    const voucher = await VoucherModel.findByIdAndUpdate(_id, updates, { new: true });

    if (!voucher) {
      return res.status(404).json({ success: false, message: "Voucher not found" });
    }

    return res.status(200).json({ success: true, message: "Voucher updated successfully", data: voucher });
  } catch (error) {
    console.error("Update voucher error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const DeleteVoucher = async (req, res) => {
  const validated = validate(voucherIdSchema, req.params);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  try {
    const voucher = await VoucherModel.findByIdAndDelete(validated.data._id);

    if (!voucher) {
      return res.status(404).json({ success: false, message: "Voucher not found" });
    }

    return res.status(200).json({ success: true, message: "Voucher deleted successfully" });
  } catch (error) {
    console.error("Delete voucher error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const ApplyVoucherToOrder = async (req, res) => {
  const validated = validate(applyVoucherSchema, req.body);

  if (!validated.success) {
    return res.status(400).json({ success: false, message: validated.message });
  }

  try {
    const { orderId, code } = validated.data;
    const voucher = await VoucherModel.findOne({ code: code.toUpperCase(), active: true });

    if (!voucher) {
      return res.status(404).json({ success: false, message: "Voucher not found or inactive" });
    }

    const now = new Date();
    if (voucher.startDate && now < voucher.startDate) {
      return res.status(400).json({ success: false, message: "Voucher is not active yet" });
    }

    if (voucher.endDate && now > voucher.endDate) {
      return res.status(400).json({ success: false, message: "Voucher has expired" });
    }

    if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit) {
      return res.status(400).json({ success: false, message: "Voucher usage limit reached" });
    }

    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const baseAmount = Number(order?.pricing?.subtotal || 0) + Number(order?.pricing?.tax || 0) + Number(order?.pricing?.shippingCharge || 0);

    if (baseAmount < voucher.minOrderAmount) {
      return res.status(400).json({ success: false, message: "Order amount is below voucher minimum requirement" });
    }

    const { discountAmount, totalAmount } = calculateDiscount(order, voucher);

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        $set: {
          coupon: {
            code: voucher.code,
            type: voucher.type,
            value: voucher.value,
            appliedDiscount: discountAmount,
          },
          "pricing.discount": discountAmount,
          "pricing.total": totalAmount,
        },
      },
      { new: true }
    );

    await VoucherModel.findByIdAndUpdate(voucher._id, { $inc: { usedCount: 1 } });

    return res.status(200).json({
      success: true,
      message: "Voucher applied successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Apply voucher error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
