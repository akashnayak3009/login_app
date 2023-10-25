import express from "express";
import {
  changePassword,
  deleteProfile,
  forgotpassword,
  getAllUserProfile,
  getUserProfile,
  sendPasswordLink,
  signIn,
  signUp,
  updateProfile,
} from "../controllers/userController.js";
import {authMiddleware} from '../middleware/authMiddleware.js'

const UserRouter = express.Router();

UserRouter.post("/create", signUp);
UserRouter.post("/login", signIn);
UserRouter.post("/sendpasswordlink", sendPasswordLink);
UserRouter.post("/:id/:token", changePassword);

UserRouter.get("/fetchAllProfile", authMiddleware, getAllUserProfile);
UserRouter.get("/fetchProfile/:id", authMiddleware, getUserProfile);
UserRouter.get("/forgotpassword/:id/:token", forgotpassword);

UserRouter.put("/updateProfile", authMiddleware, updateProfile);
UserRouter.delete("/deleteProfile/:id", authMiddleware, deleteProfile);

export default UserRouter;
