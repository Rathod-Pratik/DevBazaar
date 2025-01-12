const e = require('express');
const mongoose=require('mongoose');

const Contect=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const ContectModel=mongoose.model('Contect',Contect);
module.exports=ContectModel;