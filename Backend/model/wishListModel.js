const mongoose =require('mongoose');

const wishListSchema=new mongoose.Schema({
    Product_name:{
        type:Number,
        required:true,
    },
    product_image_url:{
        type:String,
        required:true
    },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Price:{
        type:Number
    },
    reting:{
        type:Number
    },
    offer:{
        type:Number
    },
})

const WishList=mongoose.model('WishList',wishListSchema);
module.exports=WishList;