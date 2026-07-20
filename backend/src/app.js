const express = require('express');
const cookieParser=require('cookie-parser');
const authrouter=require('./routes/auth.router')
const expenserouter=require('./routes/expense.router')


const app=express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authrouter)
app.use('/api/expense',expenserouter)

module.exports=app;