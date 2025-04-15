import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  Productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  UserInfo: {
    type: Object,
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