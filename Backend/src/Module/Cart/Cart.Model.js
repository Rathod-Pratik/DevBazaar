import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

const CartModel=mongoose.model('Cart',CartSchema);
export default CartModel;