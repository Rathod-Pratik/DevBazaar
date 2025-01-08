const Billing = require("../model/BillingModel");

async function AddToBilling(req, res) {
  const {
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
    (!Name ||
      !company_name ||
      !address ||
      !city ||
      !phoneNumber ||
      !email ||
      !productData,
    !apartment)
  ) {
    return res.status(400).json({ error: "All the Product data is required" });
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
      product_date: productData,
    });

    if (AddToBilling) {
      return res.status(201).json({ message: "Product added to Billing" });
    } else {
      return res
        .status(400)
        .json({ message: "Product failed to add to Billing" });
    }
  } catch (error) {
    console.log("Error adding to Billing:", error.message);
  }
}

module.exports = { AddToBilling };