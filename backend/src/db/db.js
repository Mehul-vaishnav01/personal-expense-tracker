const mongoose = require('mongoose');

async function connectdb() {

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected sucessfully");
    }catch(err){
        console.log("Databse connection err",err);
    }
    
}

module.exports=connectdb;