import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import {connectDb} from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import { createUser } from "./seeders/user.js";
import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";
const app=express();
dotenv.config();
connectDb();
app.use(express.json());
app.use(cookieParser());
app.use("/user",userRoutes);
app.use("/chat",chatRoutes);
app.use("/admin",adminRoute);
app.use(errorMiddleware);
app.listen(process.env.PORT,()=>{
    console.log(`server is running on `,process.env.PORT);
})