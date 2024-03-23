const AsyncHandler=require('express-async-handler');
const Message=require("../models/messageSchema");
const User=require('../models/userSchema');
const Chat = require('../models/chatSchema');
module.exports.sendMessage=AsyncHandler(async(req,res)=>{
    console.log("1");
    console.log(req.user);
    const{content,chatId}=req.body;
    if(!content||!chatId){
    console.log("2");
        return res.status(400).json({
            message:"content or chatId is missing",
            success:false
        })
    }
    console.log("3");
    var newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId
    }
    console.log("inside "+newMessage);
    try{
    console.log("4");
        var message=await Message.create(newMessage);
        message=await message.populate("sender","name pic");
        message=await message.populate("chat");
        message=await User.populate(
            message,{
                path:"chat.users",
                select:"name pic email"
            }
        )
    console.log("5");
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        });
    console.log("6");
        return res.status(200).json({
            success:true,
            message:message
        })
    }
    catch(error){
    console.log("7");
        return res.status(400).json({
            message:error.message,
            success:true
        })
    }
})
module.exports.allMessage=AsyncHandler(async(req,res,next)=>{
     try{
        const message=await Message.find({chat:req.params.chatId})
        .populate("sender","name pic email")
        .populate("chat");
        return res.json(message);
     }
     catch(error){
        return res.status(400).json({
            message:"error",
            success:false
        })
     }
})