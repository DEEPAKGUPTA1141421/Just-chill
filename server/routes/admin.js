import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
    adminLogin,
    adminLogout,
    allChats,
    allMessages,
    allUsers,
    getAdminData,
    getDashboardStats,
  } from "../controllers/admin.js";
  import { adminLoginValidator,validateHandler} from "../lib/validators.js";
const adminRoutes = express.Router();
adminRoutes.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

adminRoutes.get("/logout", adminLogout);

// Only Admin Can Accecss these Routes

//adminRoutes.use(adminOnly);

adminRoutes.get("/", getAdminData);

adminRoutes.get("/users", allUsers);
adminRoutes.get("/chats", allChats);
adminRoutes.get("/messages", allMessages);

adminRoutes.get("/stats", getDashboardStats);


export default adminRoutes;