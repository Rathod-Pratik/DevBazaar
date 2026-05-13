import ReviewModel from "./Review.Model.js";
import {
    mongoIdSchema,
    productIdSchema,
    productIdsQuerySchema,
    reviewCreateSchema,
} from "./Review.Validation.js";
import { deleteFile, uploadFileToS3, getSignedUrlS3 } from "../../Utils/Function.js";

const formatValidationErrors = (error) => error.issues.map((err) => err.message).join(", ");

const uploadReviewImages = async (files = []) => {
    if (!Array.isArray(files) || files.length === 0) {
        return [];
    }

    const uploaded = await Promise.all(
        files.map(async (file) => {
            const result = await uploadFileToS3({
                buffer: file.buffer,
                fileName: file.originalname,
                fileType: file.mimetype,
                folderType: "review",
            });

            return { url: result.url };
        })
    );

    return uploaded;
};

const withSignedImageUrls = async (review) => {
    const data = review.toObject ? review.toObject() : review;

    if (Array.isArray(data.images)) {
        data.images = await Promise.all(
            data.images.map(async (image) => {
                if (image?.url) {
                    return {
                        ...image,
                        signedUrl: await getSignedUrlS3(image.url),
                    };
                }

                return image;
            })
        );
    }

    return data;
};

export const GetReview=async(req,res)=>{
    const validation = productIdSchema.safeParse(req.params);

    if (!validation.success) {
        return res.status(400).json({ message: formatValidationErrors(validation.error) });
    }

    const { ProductId } = validation.data;

    try {
        const Review=await ReviewModel.find({ ProductId });
        if(!Review){
            return res.status(200).send("No Review found");
        }
        else{
            const reviewsWithImages = await Promise.all(Review.map(withSignedImageUrls));
            return res.status(200).json({Review: reviewsWithImages})
        }
    } catch (error) {
        return res.status(400).json({"Message":error.message})
    }
}

export const GetReviewsByProducts = async (req, res) => {
    const validation = productIdsQuerySchema.safeParse(req.query);

    if (!validation.success) {
        return res.status(400).json({ message: formatValidationErrors(validation.error) });
    }

    const { productIds } = validation.data;

    const ids = String(productIds)
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

    if (ids.length === 0) {
        return res.status(400).json({ message: "At least one product id is required" });
    }

    try {
        const reviews = await ReviewModel.find({ ProductId: { $in: ids } });
        const reviewsWithImages = await Promise.all(reviews.map(withSignedImageUrls));
        return res.status(200).json({ Review: reviewsWithImages });
    } catch (error) {
        return res.status(400).json({ Message: error.message });
    }
}

export const GetAllReview=async(req,res)=>{
    try {
        const Review=await ReviewModel.find();
        if(!Review){
            return res.status(200).send("No Review found");
        }
        else{
            const reviewsWithImages = await Promise.all(Review.map(withSignedImageUrls));
            return res.status(200).json({Review: reviewsWithImages})
        }
    } catch (error) {
        return res.status(400).json({"Message":error.message})
    }
}

export const CreateReview=async(req,res)=>{
    const validation = reviewCreateSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ message: formatValidationErrors(validation.error) });
    }

    const { ProductId, userId, reviewText, reviewStar } = validation.data;
    try {
        const images = await uploadReviewImages(req.files);

        const Review=await ReviewModel.create({
            ProductId,
            userId,
            reviewText,
            reviewStar,
            images,
        })
        if(Review){
            const reviewWithImages = await withSignedImageUrls(Review);
            return res.status(201).json({Review: reviewWithImages})
        }
        else{
            return res.status(400).send("Failed to create review")
        }
    } catch (error) {
        return res.status(400).json({message:error})
    }
}

export const DeleteReview=async(req,res)=>{
    const validation = mongoIdSchema.safeParse(req.params);

    if (!validation.success) {
        return res.status(400).json({ message: formatValidationErrors(validation.error) });
    }

    const {_id}=validation.data;
    try {
        const Review=await ReviewModel.findById(_id);

        if (!Review) {
            return res.status(400).send("Failed to delete review")
        }

        if (Array.isArray(Review.images) && Review.images.length > 0) {
            await Promise.all(
                Review.images.map(async (image) => {
                    if (image?.url) {
                        await deleteFile(image.url);
                    }
                })
            );
        }

        await ReviewModel.findByIdAndDelete(_id);

        if(Review){
            return res.status(200).send("delete review Successfully")
        }
        else{
            return res.status(400).send("Failed to delete review")
        }
    } catch (error) {
        return res.status(400).json({message:error})
    }
}