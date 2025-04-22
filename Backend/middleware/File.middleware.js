import cloudinary from "./cloudinaryConfig.js";

// Upload image to Cloudinary (multer already uploads it there)
export const UploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // The uploaded image URL is directly available in req.file.path
    req.imageUrl = req.file.path;
    next();
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(400).send("Failed to upload image");
  }
};

// Update existing Cloudinary image
export const UpdateImages = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const ImageId = req.params.id;
    if (!ImageId) {
      return res.status(400).send("Image ID is required to update the image");
    }

    // Delete existing image from Cloudinary
    const deleted = await cloudinary.uploader.destroy(`DavBazzar/${ImageId}`);
    console.log("Cloudinary delete response:", deleted);

    // Since multer already uploaded the new image — just pick its URL
    req.newImage = req.file.path;

    next();
  } catch (error) {
    console.error("Update Image failed:", error);
    return res.status(400).json({
      message: "Image update failed",
      error: error.message,
    });
  }
};

// Delete image from Cloudinary
export const DeleteImage = async (req, res, next) => {
  try {
    const ImageId = req.params.id;
    if (!ImageId) {
      return res.status(400).send("Image ID is required to delete an image");
    }

    const deleted = await cloudinary.uploader.destroy(`DavBazzar/${ImageId}`);
    console.log("Cloudinary delete response:", deleted);

    next();
  } catch (error) {
    console.error("Delete Image failed:", error);
    return res.status(400).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};
