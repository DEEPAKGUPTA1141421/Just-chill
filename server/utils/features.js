import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
const connectDb=()=>{
    console.log("hello");
    const promiseReturByMongoose=mongoose.connect(process.env.MONGODB_URL);
    promiseReturByMongoose.then(()=>{
        console.log("connection Successful");
    }).catch((err)=>{
        console.log("connection unsuccesful");
    })
}
const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(code).cookie("chattu-token", token, cookieOptions).json({
      success: true,
      user,
      message,
    });
  };
const emitEvent=(req,event,users,data)=>{
  console.log("Emitting event");
}
const deletFilesFromCloudinary=()=>{

}
const uploadFilesToCloudinary=()=>{

}
export{connectDb,sendToken,cookieOptions,emitEvent,deletFilesFromCloudinary,uploadFilesToCloudinary};
