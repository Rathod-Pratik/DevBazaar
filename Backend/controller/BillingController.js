import Billing from "../model/BillingModel.js";
import CartModel from "../model/CartModel.js";
import OrderModel from "../model/OrderModel.js";


export async function AddToBilling(req, res) {
  const {
    user,
    Name,
    company_name,
    address,
    apartment,
    city,
    phoneNumber,
    email,
    productData,
  } = req.body;

  if (
    !Name ||
    !company_name ||
    !address ||
    !city ||
    !phoneNumber ||
    !email ||
    !productData ||
    !apartment ||
    !user
  ) {
    return res.status(400).json({ error: "All the Product data is required" });
  }

  const alreadyExistInBilling = await Billing.findOne({
    Name: Name,
    email: email,
    phoneNumber: phoneNumber,
    productData: productData,
  });
  const alreadyExistInOrder = await OrderModel.findOne({
    user,
    product: productData,
  });


  if (alreadyExistInBilling && alreadyExistInOrder) {
    res.status(200).json({ message: "Product already exists in Billing" });
  }
  try {
    const AddToBilling = await Billing.create({
      name: Name,
      company_name: company_name,
      address: address,
      apartment: apartment,
      city: city,
      phone_number: phoneNumber,
      email: email,
      productData: productData,
    });

    const newOrder = OrderModel.create({
      user,
      product: productData,
      status: "Pending",
    });

    // Remove product from CartModel
    const deleteCart = await CartModel.deleteMany({ user });

    if (deleteCart.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found in the Cart" });
    }

    if (AddToBilling || newOrder) {
      return res.status(201).json({ message: "Product added to Billing" });
    } else {
      return res
        .status(400)
        .json({ message: "Product failed to add to Billing" });
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

