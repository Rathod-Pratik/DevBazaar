import mongoose from "mongoose";

const wishListSchema=new mongoose.Schema({
    Product_name:{
        type:String,
        required:true,
    },
    Product_image:{
        type:String,
        required:true
    },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Original_Price:{
        type:Number,
        required:true
    },
    off:{
        type:Number,
        required:true
    },
})

const WishList=mongoose.model('WishList',wishListSchema);
export default WishList;