import ProductModel from "../model/ProductModel.js";

export const Create_Product = async (req, res) => {
  const { Product_name, off, Price, Description, category } = req.body;
  const product_image_url = req.imageUrl;

  if (!Product_name || !off || !Price || !Description || !category) {
    return res.status(400).send("All the fields are required");
  }
  try {
    const AddProduct = await ProductModel.create({
      Product_name,
      off,
      Price,
      Description,
      product_image_url,
      category,
    });
    if (AddProduct) {
      return res.status(201).json({
        success: true,
        data: AddProduct,
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
export const Delete_Product = async (req, res) => {
  const { Product_name, category } = req.body;

  if (!category || !Product_name) {
    return res.status(400).send("Product name is required");
  }
  try {
    const deleteProduct = await ProductModel.findOneAndDelete({
      Product_name,
      category,
    });

    if (deleteProduct) {
      return res.status(200).send("Product Deleted Successfully");
    } else {
      return res.status(400).send("Failed to delete Product");
    }
  } catch (error) {
    return res.status(400).json({
      Message: error,
    });
  }
};
export const Update_Product = async (req, res) => {
  const { Product_name, off, Price, Description, category, _id } = req.body;
  const product_image_url = req.newImage;
  try {
    const updateFields = {};

    if (Product_name) updateFields.Product_name = Product_name;
    if (off) updateFields.off = off;
    if (Price) updateFields.Price = Price;
    if (Description) updateFields.Description = Description;
    if (category) updateFields.category = category;
    if (product_image_url) updateFields.product_image_url = product_image_url;

    const updateProduct = await ProductModel.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true }
    );

    if (updateProduct) {
      return res
        .status(200)
        .json({ data: updateProduct, Message: "Product updated Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const Get_Product = async (req, res) => {
  try {
    const Products = await ProductModel.find();

    if (Products.length < 0) {
      return res.status(200).send("No Product found");
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
