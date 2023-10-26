import jwt from "jsonwebtoken";
import LoginProfiles from "../models/userModel.js";

// export const authMiddleware = asyncHandler(async (req, res, next) => {
//     let token;
//     if (req?.headers?.authorization?.startsWith("Bearer")) {
//         token = req.headers.authorization.split(" ")[1];
//         try {
//             if (token) {
//                 const decoded = jwt.verify(token, process.env.JWT_SECRET);
//                 const user = await User.findById(decoded?.id);
//                 req.user = user;
//                 next();
//             }
//         } catch (error) {
//             throw new Error("Not Authorized, please login again");
//         }
//     } else {
//         throw new Error("No Token Provided");
//     }
// });

export const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await LoginProfiles.findById(decoded?.id);
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ error: "User not found" });
        }
      }
    } catch (error) {
      res.status(401).json({ error: "Not Authorized, please login again" });
    }
  } else {
    res.status(401).json({ error: "No Token Provided" });
  }
};

 export const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  try {
    if (!email) return res.status(404).json({ message: "User Not found" });

    const isAdmin = await LoginProfiles.findOne({ email });
    if (isAdmin.roles !== "admin") {
      return res.status(400).json({ message: "You are not admin" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: "Admin Not found" });
  }
};
