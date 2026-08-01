const express = require('express');
const cookieParser=require('cookie-parser');
const authrouter=require('./routes/auth.router')
const expenserouter=require('./routes/expense.router')
const cors = require("cors");

const app=express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authrouter)
app.use('/api/expense',expenserouter)

module.exports=app;