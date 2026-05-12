import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  ProductId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  images: [
    {
      url: String,
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviewText:{
    type:String,
    required:true
  },
  reviewStar:{
    type:Number,
    max:5,
    min:1
  },
  
},{Timestamp:true});

const ReviewModel=mongoose.model('review',ReviewSchema)

export default ReviewModel;