import express from "express";
import { acceptFriendRequest, getMyFriends, getMyNotifications, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validators.js";
const userRouter = express.Router(); 
userRouter.post("/login",loginValidator(),validateHandler,login);
userRouter.post("/new",singleAvatar,registerValidator(),validateHandler,newUser);
userRouter.use(isAuthenticated);
userRouter.get("/getprofile",getMyProfile);
userRouter.get("/logout",logout);
userRouter.get("/search", searchUser);
userRouter.get("/sendrequest",sendRequestValidator(),validateHandler,sendFriendRequest);

// app.put(
//   "/sendrequest",
//   sendRequestValidator(),
//   validateHandler,
//   sendFriendRequest
// );

userRouter.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);

 userRouter.get("/notifications", getMyNotifications);

 userRouter.get("/friends", getMyFriends);
export default userRouter; 
