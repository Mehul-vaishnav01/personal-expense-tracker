const express = require('express');
const cookieParser=require('cookie-parser');
const authrouter=require('./routes/auth.router')
const app=express();

app.use(express.json());
app.use(cookieParser())


app.use('/api/auth',authrouter)

module.exports=app;