const mongoose = require('mongoose');

const expanceschema=new mongoose.Schema({
    
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",       
        required: true,
    },
    title: {
        type:String,
        required:true,

    },
    amount:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    uri:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const expancemodel=mongoose.model("expance",expanceschema);


module.exports=expancemodel;