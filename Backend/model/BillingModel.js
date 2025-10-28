import mongoose from "mongoose";

const BillingSchema=mongoose.Schema({
    product_date:{
        type:Object,
        default:Date.now
    },
    name:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    apartment:{
        type:String
    },
    productData:{
        type:Object,
        required:true
    }
});

const Billing = mongoose.model('Billing', BillingSchema);

export default Billing;