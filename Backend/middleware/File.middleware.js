import fs from "fs";
import cloudinary from "./cloudinaryConfig.js";

console.log(process.env.CLOUDINARY_CLOUD_NAME)
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_SECRET_KEY)

// Upload image to Cloudinary
export const UploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const localFilePath = req.file.path;

    const uploadedUrl = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "DavBazzar",
    });

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    req.imageUrl = uploadedUrl.secure_url;
    next();
  } catch (error) {
    console.error("Upload error:", error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
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

    // Upload new image
    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "DavBazzar",
      public_id: ImageId,
    });

    fs.unlinkSync(req.file.path);

    req.newImage = uploaded.secure_url;
    next();
  } catch (error) {
    console.error("Update Image failed:", error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
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
