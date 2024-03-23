const asyncHandler=require('express-async-handler');
const User=require('../models/userSchema');
const generateToken=require("../config/generateToken");
const bcrypt=require('bcryptjs');
module.exports.registerUser=async(req,res)=>{
    const{name,email,password}=req.body;
    if(!name ||!email ||!password){
       return res.status(400).json({
            message:"please enter all the fields",
            success:false
        })
        return;
    }
    const userExists=await User.findOne({'email':email});
    if(userExists){
        return res.status(400).json({
            message:"User already Exists",
            success:false
        })
    }
    const user=await User.create(req.body);
    console.log(user);
    if(user){
        return res.status(201).json({
            message:"user created succesfully",
            user:user,
            token:generateToken(user._id)
        })
    }
    else{
        return res.status(400).json({
            message:"user not created",
            success:false
        });
    }
}
module.exports.authUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    const user=await User.findOne({email});
    if(user&&(await user.matchPassword(password))){
        return res.status(201).json({
        message:"Login successfully",
        user:user,
        token:generateToken(user._id)
        })
    }
    else{
        return res.status(201).json({
            message:"Login unsuccessfully",
            success:false
        })
    }
})
module.exports.allUsers=asyncHandler(async(req,res)=>{
    const keyword=req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }:{};
    console.log(keyword);
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    return res.status(201).json({
        successs:"list if searched users",
        users:users
    })
}
)