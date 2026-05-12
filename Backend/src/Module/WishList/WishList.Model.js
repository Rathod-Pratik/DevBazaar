import mongoose from "mongoose";

const wishListSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const WishList=mongoose.model('WishList',wishListSchema);
export default WishList;