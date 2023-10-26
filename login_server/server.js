import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { handleError, notFound } from "./middleware/errorHandler.js";
import UserRouter from "./routes/userRouter.js";
import rateLimit from "express-rate-limit";
import activityRouter from "./routes/activityRouter.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

//bodyParser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);



//cookieParser
app.use(cookieParser());

// Apply rate limiting middleware to the "/api/user" route
const userApiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
});


//Routes
app.use("/api/user",userApiLimiter, UserRouter)
app.use("/api/activity",activityRouter)


//Error handling routes
app.use(notFound);
app.use(handleError);


const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(
    `Server is connected and  mode at http://localhost:${port}`.yellow.bold
  );
});
