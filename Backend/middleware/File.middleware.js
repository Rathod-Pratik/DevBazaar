import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Upload image to Cloudinary (from in-memory buffer)
export const UploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "DavBazzar",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Upload error:", error);
          return res.status(500).send("Failed to upload image");
        }

        req.imageUrl = result.secure_url;
        next();
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);

  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).send("Failed to upload image");
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

    // Upload the new image
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "DavBazzar",
        public_id: ImageId, // re-use same public_id to replace it
        resource_type: "auto",
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          console.error("Update image failed:", error);
          return res.status(500).json({
            message: "Image update failed",
            error: error.message,
          });
        }

        req.newImage = result.secure_url;
        next();
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);

  } catch (error) {
    console.error("Update Image failed:", error);
    return res.status(500).json({
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
    return res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};
