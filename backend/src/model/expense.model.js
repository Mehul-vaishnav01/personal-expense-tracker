const mongoose = require('mongoose');

const expanceschema=new mongoose.Schema({
    title: {
        type:String,
        requried:true,

    },
    amount:{
        type:Number,
        requried:true,
    },
    catagries:{
        type:String,
        requried:true,
    },
    uri:{
        type:String,
        requried:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const expancemodel=mongoose.model("expance",expanceschema);


module.exports=expancemodel;