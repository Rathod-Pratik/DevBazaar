import Category from "./Category.Model.js";
import { categoryCreateSchema, categoryUpdateSchema, idSchema } from "./Category.validation.js";

export const CreateCategory = async (req, res) => {
  const validation = categoryCreateSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.error.errors.map((e) => e.message).join(", "),
    });
  }

  const { name, description, iconName } = validation.data;

  try {
    const category = await Category.create({ name, description, iconName });
    if (!category) {
      return res.status(400).json({ success: false, message: "Failed to create category" });
    }
    return res.status(200).json({ data: category, message: "Category Created successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while Creating categories",
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while fetching categories",
    });
  }
};

export const updateCategory = async (req, res) => {
  const validation = categoryUpdateSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.error.errors.map((e) => e.message).join(", "),
    });
  }

  const { _id, name, description, iconName } = validation.data;

  try {
    const UpdateData = {};
    if (name) UpdateData.name = name;
    if (description) UpdateData.description = description;
    if (iconName) UpdateData.iconName = iconName;

    const update = await Category.findByIdAndUpdate(_id, UpdateData, { new: true });

    if (!update) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({ success: true, update });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while updating categories",
    });
  }
};


export const DeleteCategory = async (req, res) => {
  const validation = idSchema.safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: validation.error.errors.map((e) => e.message).join(", "),
    });
  }

  const { _id } = validation.data;

  try {
    const Delete = await Category.findByIdAndDelete(_id);
    if (!Delete) {
      return res.status(400).send("Category not found");
    }
    return res.status(200).send("Category Deleted successfully");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while deleting categories",
    });
  }
};
