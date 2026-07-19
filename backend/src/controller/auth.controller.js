const usermodel=require('../model/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')

async function registeruser(req,res) {
    const {username,email,password}=req.body;

    const isuseralreadyexist=await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isuseralreadyexist)
    {
        return res.status(403).json({message:"User already exist"}); 
    }
    const hash=await bcrypt.hash(password,10)

    const user= await usermodel.create({
        username,
        email,
        password:hash
    })


    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)


    res.cookie("token",token)

    res.status(201).json({
        message:"User created sucessfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}


async function login(req,res) {
    const {username,email,password}=req.body;

    const user=await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(401).json({
            message:"Invalid credential"
        })
    }
    const ispasswordvalid=await bcrypt.compare(password,user.password)

    if(!ispasswordvalid){
        return res.status(401).json({
            message:"Invalid credential"
        })
    }
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)


    res.cookie("token",token)

    res.status(201).json({
        message:"User logged in sucesssfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}


async function logout(req,res) {
    res.clearCookie("token")
    res.status(200).json({
        message:"User loggedout Sucessfully"
    })
}

module.exports={registeruser,login,logout}