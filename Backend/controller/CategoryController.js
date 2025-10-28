import Category from "../model/CategoryModel.js";

export const CreateCategory = async (req, res) => {
  const { name, description,iconName } = req.body;

  if (!name || !description || !iconName) {
    return res.status(400).send("All field are required");
  }

  try {
    const category = await Category.create({ name, description,iconName });
    if (!category) {
      return res.status(400).send("Failed to category");
    }
    res
      .status(200)
      .json({ data: category, message: "Category Created sucessfully" });
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong while Creating categories"
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
  const { name, description, _id,iconName } = req.body;

  try {
    // Build update object dynamically
    const UpdateData = {};
    if (name) UpdateData.name = name;
    if (description) UpdateData.description = description;
    if (iconName) UpdateData.iconName = iconName;

    // Perform update
    const update = await Category.findByIdAndUpdate(
      _id,
      UpdateData,  // <-- directly pass update fields here
      {
        new: true,  // Return the updated document
      }
    );

    if (!update) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Success response
    return res.status(200).json({ success: true, update });

  } catch (error) {
    // Error handling
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while updating categories"
    });
  }
};


export const DeleteCategory = async (req, res) => {
  const { _id } = req.params;
  try {
    if (!_id) {
      return res.status(400).send("_id is required");
    }

    const Delete = await Category.findByIdAndDelete(_id);
    if (!Delete) {
      return res.status(400).send("Category not found");
    }
    return res.status(200).send("Category Deleted successfully");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while deleting categories",
    });
  }
};
