const mongoose=require('mongoose');

const BillingSchema=mongoose.Schema({
    product_date:{
        type:Object,
        required:true
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
    }
});

const Billing = mongoose.model('Billing', BillingSchema);

module.exports = Billing;