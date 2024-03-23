const AsyncHandler = require("express-async-handler");
const Chat = require("../models/chatSchema");
const User = require("../models/userSchema");

module.exports.accessChat=AsyncHandler(async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
        console.log("userId param is Not found");
        return res.sendStatus(400);
    }
    var  isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$eq:req.user._id}},
            {users:{$eq:userId}}
        ]
    }).populate("users","-password")
    .populate("latestMessage");
    isChat=await User.populate(
        isChat,
        {
            path:"latestMessage.sender",
            select:"name pic email"
        }
    );
    if(isChat.length>0){
        res.send(isChat[0]);
    }
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        };
        try{
            const createChat=await Chat.create(chatData);
            const FullChat=await Chat.findOne({
                _id:createChat._id
            }).populate("users","-password");
            res.status(200).json(
                FullChat
            )
        }
        catch(error){
            res.send(400);
            throw new Error(error.message);
        }
    }
})
module.exports.fetchChat=AsyncHandler(async(req,res)=>{
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
          .populate("users", "-password")
          .populate("groupAdmin", "-password")
          .populate("latestMessage")
          .sort({ updatedAt: -1 })
          .then(async (results) => {
            results = await User.populate(results, {
              path: "latestMessage.sender",
              select: "name pic email",
            });
            res.status (200).json(results);
          });
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
})
module.exports.createGroupChat=AsyncHandler(async(req,res)=>{
    const {name,users}=req.body;
    if(!name ||!users){
        return res.status(400).json({
            message:"please fill the all the fields"
        })
    }
    var allusers=JSON.parse(users);
    if(allusers.length<2){
        return res.status(400).json({
            message:"for group chat meneber should be greater then 2"
        })
    }
    allusers.push(req.user);
    try{
        const groupChat=await Chat.create({
            chatName:name,
            users:allusers,
            isGroupChat:true,
            groupAdmin:req.user
        });
        const fullGroupChat=await Chat.findOne({
            _id:groupChat._id})
            .populate("users","-password")
            .populate("groupAdmin","-password");
        return res.status(200).json({
            fullGroupChat:fullGroupChat
        })    
    }
    catch(error){
        return res.status(400).json({
            message:"FullGroupChat not  created",
            success:false
        }) 
    }

})
module.exports.renameGroup=AsyncHandler(async(req,res)=>{
    const {chatName,chatId}=req.body;
    const updatedChat=await Chat.findByIdAndUpdate(chatId,{
        chatName
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!updatedChat){
       return  res.status(404).json({
            message:"not updated",
            success:false
        })
    }
    else{
       return res.status(200).json({
            updatedChat:updatedChat,
            message:"upxdated successfully",
            success:true
        })
    }
})
module.exports.addToGroup=AsyncHandler(async(req,res)=>{
    const {userId,chatId}=req.body;
    const added=await Chat.findByIdAndUpdate(chatId,{
       $push:{users:userId}
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!added){
       return res.status(404).json({
            success:false,
            message:"not added to group"
        })
    }
    else{
        return res.status(200).json({
            message:"add to group",
            success:true,
            added:added
        })
    }
})
module.exports.removeFromGroup=AsyncHandler(async(req,res)=>{
    const {userId,chatId}=req.body;
    const added=await Chat.findByIdAndUpdate(chatId,{
       $pull:{users:userId}
    },{
        new:true
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    if(!added){
       return res.status(404).json({
            success:false,
            message:"not remove to group"
        })
    }
    else{
        return res.status(200).json({
            message:"remove to group",
            success:true,
            added:added
        })
    }
})