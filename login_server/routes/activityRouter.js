import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getLoginActivity,
  getLogoutActivity,
  postLoginActivity,
  postLogoutActivity,
} from "../controllers/activityController.js";

const activityRouter = express.Router();

activityRouter.post("/",authMiddleware, postLoginActivity);
activityRouter.post("/post",authMiddleware, postLogoutActivity);
activityRouter.get("/login-time", authMiddleware, getLoginActivity);
activityRouter.get("/logout-time", authMiddleware, getLogoutActivity);

export default activityRouter;
