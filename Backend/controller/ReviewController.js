import ReviewModel from "../model/ReviewModel.js";

export const GetReview=async(req,res)=>{
    const {Productid}=req.params;
    if(!Productid){
        return res.status(400).send("_id is required")
    }

    try {
        const Review=await ReviewModel.find({Productid});
        if(!Review){
            return res.status(200).send("No Review found");
        }
        else{
            return res.status(200).json({Review})
        }
    } catch (error) {
        return res.status(400).json({"Message":error.message})
    }
}
export const GetAllReview=async(req,res)=>{
    try {
        const Review=await ReviewModel.find();
        if(!Review){
            return res.status(200).send("No Review found");
        }
        else{
            return res.status(200).json({Review})
        }
    } catch (error) {
        return res.status(400).json({"Message":error.message})
    }
}

export const CreateReview=async(req,res)=>{
    const {Productid,UserInfo,reviewText,reviewStar}=req.body;

    if(!Productid || !UserInfo || !reviewText || !reviewStar){
        return res.status(400).send("All fields are required")
    }
    try {
        const Review=await ReviewModel.create({
            Productid,UserInfo,reviewText,reviewStar
        })
        if(Review){
            return res.status(200).json({Review})
        }
        else{
            return res.status(400).send("Failed to create review")
        }
    } catch (error) {
        return res.status(400).json({message:error})
    }
}

export const DeleteReview=async(req,res)=>{
    const {_id}=req.params;

    if(!_id){
        return res.status(400).send("All fields are required")
    }
    try {
        const Review=await ReviewModel.findByIdAndDelete(_id);

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