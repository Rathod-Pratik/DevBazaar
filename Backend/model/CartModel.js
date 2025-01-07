const mongoose=require ('mongoose');
const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number,
        default:1
    },
    Product_image:{
        type:String
    },
    Price:{
        type:String,
        required:true
    },
    Product_name:{
        type:String,
        required:true
    },
    reting:{
        type:Number
    },
    offer:{
        type:Number
    },
})

const CartModel=mongoose.model('Cart',CartSchema);

module.exports=CartModel;