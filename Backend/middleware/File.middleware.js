import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const directory = "./public";
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    const allowTypes = ["image/jpeg", "image/png"];

    if (!allowTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type,Only JPEG,PNG are allowed"));
    }
    cb(null, true);
  },
});

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
    console.log(error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).send("Failed to Upload image");
  }
};

export const UpdateImages = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    const ImageId = req.params.id;
    const deleted = await cloudinary.uploader.destroy(`DavBazzar/${ImageId}`);

    if (deleted.result === "ok") {
      console.log("Deleted successfully from Cloudinary");
    } else {
      console.log("Failed to delete from cloudinary", deleted);
    }

    const uploaded = await cloudinary.uploader.upload(req.file.path, {
      folder: "DavBazzar",
      public_id: ImageId,
    });

    fs.unlinkSync(req.file.path);

    req.newImage = uploaded.secure_url;
    next();
  } catch (error) {
    console.log("Update Image failed", error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res
      .status(400)
      .json({ message: "Image update Failed", error: error.message });
  }
};

export const DeleteImage=async(req,res,next)=>{
    try {
        const ImageId=req.params.id;
        if(ImageId){
            return res.status(400).send("Image is required to delete an image")
        }
        const deleted=await cloudinary.uploader.destroy(`DavBazzar/${ImageId}`)
        next();
    } catch (error) {
        return res.status(400).json({"Message":error})
    }
}