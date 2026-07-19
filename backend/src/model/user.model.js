const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    username:{
        type:String,
        requried:true,
        unique:true,
    },
    email:{
        type:String,
        requried:true,
        unique:true,
    },
    password:{
        type:String,
        requried:true,
    }
})

const usermodel=mongoose.model("user",userschema);

module.exports=usermodel;