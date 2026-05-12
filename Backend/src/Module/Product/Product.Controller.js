import ProductModel from "./Product.model.js";
import { uploadFileToS3, getSignedUrlS3 } from "@utils/Function.js";
import { createProductSchema, updateProductSchema, validate } from "./Product.Validation.js";

export const Create_Product = async (req, res) => {
  const validated = validate(createProductSchema, req.body);
  if (!validated.success) return res.status(400).json({ error: validated.message });

  const data = validated.data;

  try {
    let imageKeys = [];
    const productImageFiles = req.files?.product_image;
    if (productImageFiles && Array.isArray(productImageFiles) && productImageFiles[0]) {
      const file = productImageFiles[0];
      const uploaded = await uploadFileToS3({
        buffer: file.buffer,
        fileName: file.originalname || "image",
        fileType: file.mimetype || "image/jpeg",
        folderType: "products",
      });
      if (uploaded && uploaded.key) imageKeys.push(uploaded.key);
    }

    let menifectureKeys = Array.isArray(data.Menifecture_image) ? data.Menifecture_image : [];
    const menifFiles = req.files?.Menifecture_image || req.files?.menifecture_image || req.files?.menifecture || null;
    if (menifFiles && Array.isArray(menifFiles) && menifFiles.length > 0) {
      menifectureKeys = [];
      for (const f of menifFiles) {
        if (f && f.buffer) {
          const up = await uploadFileToS3({
            buffer: f.buffer,
            fileName: f.originalname || "menifecture",
            fileType: f.mimetype || "image/jpeg",
            folderType: "menifecture",
          });
          if (up && up.key) menifectureKeys.push(up.key);
        }
      }
    }

    const payload = {
      Product_name: data.Product_name,
      image: imageKeys.length ? imageKeys : data.image || [],
      discount: data.discount,
      category: data.category,
      Price: data.Price,
      about: data.about || [],
      Information: data.Information || {},
      Stock: data.Stock,
      Is_Replacement: data.Is_Replacement,
      Is_FreeDelivery: data.Is_FreeDelivery,
      Is_Warranty: data.Is_Warranty,
      Pay_on_Delivery: data.Pay_on_Delivery,
      Menifecture_image: menifectureKeys || [],
    };

    const AddProduct = await ProductModel.create(payload);
    if (AddProduct) return res.status(201).json({ success: true, data: AddProduct });
    return res.status(400).json({ error: "Failed to create product" });
  } catch (error) {
    return res.status(400).json({ error: error.message || error });
  }
};
export const Delete_Product = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Product ID is required");
  }
  try {
    const updated = await ProductModel.findByIdAndUpdate(
      id,
      { $set: { isDelete: true } },
      { new: true }
    );

    if (updated) {
      return res.status(200).send("Product marked as deleted");
    } else {
      return res.status(400).send("Failed to mark Product as deleted");
    }
  } catch (error) {
    return res.status(400).json({ Message: error });
  }
};
export const Update_Product = async (req, res) => {
  const validated = validate(updateProductSchema, req.body);
  if (!validated.success) return res.status(400).json({ error: validated.message });

  const data = validated.data;

  try {
    const updateFields = {};
    if (data.Product_name) updateFields.Product_name = data.Product_name;
    if (data.discount !== undefined) updateFields.discount = data.discount;
    if (data.Price !== undefined) updateFields.Price = data.Price;
    if (data.about) updateFields.about = data.about;
    if (data.Information) updateFields.Information = data.Information;
    if (data.category) updateFields.category = data.category;
    if (data.Stock !== undefined) updateFields.Stock = data.Stock;
    if (data.Is_Replacement !== undefined) updateFields.Is_Replacement = data.Is_Replacement;
    if (data.Is_FreeDelivery !== undefined) updateFields.Is_FreeDelivery = data.Is_FreeDelivery;
    if (data.Is_Warranty !== undefined) updateFields.Is_Warranty = data.Is_Warranty;
    if (data.Pay_on_Delivery !== undefined) updateFields.Pay_on_Delivery = data.Pay_on_Delivery;
    if (data.Menifecture_image) updateFields.Menifecture_image = data.Menifecture_image;

    const menifFiles = req.files?.Menifecture_image || req.files?.menifecture_image || req.files?.menifecture || null;
    if (menifFiles && Array.isArray(menifFiles) && menifFiles.length > 0) {
      const menifKeys = [];
      for (const f of menifFiles) {
        if (f && f.buffer) {
          const up = await uploadFileToS3({
            buffer: f.buffer,
            fileName: f.originalname || "menifecture",
            fileType: f.mimetype || "image/jpeg",
            folderType: "menifecture",
          });
          if (up && up.key) menifKeys.push(up.key);
        }
      }
      if (menifKeys.length) updateFields.Menifecture_image = menifKeys;
    }

    const productImageFiles = req.files?.product_image;
    if (productImageFiles && Array.isArray(productImageFiles) && productImageFiles[0]) {
      const file = productImageFiles[0];
      const uploaded = await uploadFileToS3({
        buffer: file.buffer,
        fileName: file.originalname || "image",
        fileType: file.mimetype || "image/jpeg",
        folderType: "products",
      });
      if (uploaded && uploaded.key) updateFields.image = [uploaded.key];
    }

    const updateProduct = await ProductModel.findByIdAndUpdate(data._id, updateFields, { new: true });

    if (updateProduct) return res.status(200).json({ data: updateProduct, Message: "Product updated Successfully" });
    return res.status(400).json({ error: "Failed to update product" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const Get_Product = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    // Exclude soft-deleted items
    const filter = { isDelete: { $ne: true } };

    const [total, products] = await Promise.all([
      ProductModel.countDocuments(filter),
      ProductModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
    ]);

    if (!products || products.length === 0) {
      return res.status(200).json({ items: [], page, limit, total, totalPages: Math.ceil(total / limit) });
    }

    const mapped = await Promise.all(
      products.map(async (p) => {
        const item = p.toObject ? p.toObject() : p;

        const images = Array.isArray(item.image) ? item.image : [];
        const menif = Array.isArray(item.Menifecture_image) ? item.Menifecture_image : [];

        const imageWithUrls = await Promise.all(
          images.map(async (key) => ({ key, url: await getSignedUrlS3(key) }))
        );

        const menifWithUrls = await Promise.all(
          menif.map(async (key) => ({ key, url: await getSignedUrlS3(key) }))
        );

        return {
          ...item,
          image: imageWithUrls,
          Menifecture_image: menifWithUrls,
        };
      })
    );

    return res.status(200).json({ items: mapped, page, limit, total, totalPages: Math.ceil(total / limit) });

  } catch (error) {
    return res.status(400).json({ error: error.message || error });
  }
};

