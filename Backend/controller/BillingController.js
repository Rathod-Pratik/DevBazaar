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

  const alreadyExists = await Billing.findOne({ Name: Name, email: email, phoneNumber: phoneNumber, productData: productData });

  if (alreadyExists) {
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