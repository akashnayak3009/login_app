import LoginProfiles from "../models/userModel.js";
import { generateToken } from "../config/jwtToken.js";
import { validateMongodbId } from "../config/validateMongoDbId.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//@Desc Create the user Profile
//@Method POST method
export const signUp = async (req, res) => {
  const email = req.body.email;

  try {
    const existingUser = await LoginProfiles.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }
    const newUser = await LoginProfiles.create(req.body);
    return res.status(201).json({
      status: true,
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error while creating user:", error);
    return res.status(500).json({
      status: false,
      message: "User Not Created",
    });
  }
};

//@Desc Sign In the user Profile
//@Method POST method
export const signIn = async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile && !password) {
    return res
      .status(400)
      .json({ status: false, message: "Mobile and password is empty" });
  }

  const user = await LoginProfiles.findOne({ mobile });

  if (user && (await user.isPasswordMatched(password))) {
    const token = generateToken(user?._id);

    res.status(200).json({
      status: true,
      message: "Login successfully",
      token,
      user,
    });
  } else {
    res.status(401).json({
      status: false,
      message: "Invalid Credentials",
    });
  }
};

//@Desc Get all userProfile
//@Method GET METHOD
export const getAllUserProfile = async (req, res) => {
  try {
    const allUser = await LoginProfiles.find();
    res.status(201).json({
      status: true,
      message: "All users Fetched successfully",
      allUser,
    });
  } catch (error) {
    throw new Error(error);
  }
};

//@Desc Get userProfile
//@Method GET METHOD
export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getProfile = await LoginProfiles.findById(id);
    if (getProfile) {
      return res.status(200).json({
        status: true,
        message: "User found successfully",
        getProfile,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error while fetching user profile:", error);
      res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};


//@Desc Update the user Profile
//@Method PUT method
export const updateProfile = async (req, res) => {
    const { _id } = req.user;
    try {
      validateMongodbId(_id);
      if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
      }
  
      const user = await LoginProfiles.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      if (user) {
        return res.status(200).json({
          status: true,
          message: "User data is updated",
          user,
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error while updating user data:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };
  
  //@Desc Delete the user Profile
  //@Method DELETE method
  export const deleteProfile = async (req, res) => {
    const { _id } = req.user;
    try {
      validateMongodbId(_id);
      const deletedUser = await LoginProfiles.findByIdAndDelete(_id);
      if (deletedUser) {
        return res.status(200).json({
          status: true,
          message: "User Deleted Successfully",
        });
      } else {
        return res.status(404).json({
          status: false,
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error while deleting user:", error);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  };
  
  //@Desc Send email link for reset password
  //@Method POST method
  
  export const sendPasswordLink = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ status: 400, message: "Enter Your Email" });
      }
  
      const userfind = await LoginProfiles.findOne({ email });
  
      if (!userfind) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }
  
      const token = jwt.sign({ _id: userfind._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Change this as per your requirements
      });
  
      const updatedUser = await LoginProfiles.findByIdAndUpdate(
        { _id: userfind._id },
        { verifytoken: token },
        { new: true }
      );
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset",
        text: `Click the following link to reset your password: http://localhost:3000/forgotpassword/${userfind.id}/${token}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({
            status: 500,
            message: "Email not sent",
          });
        } else {
          console.log("Email sent", info.response);
          return res.status(201).json({
            status: 201,
            message: "Email sent successfully",
          });
        }
      });
    } catch (error) {
      console.error("Error while sending password reset link:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };
  
  // @Desc verify user for forgot password time
  // @METHOD  GET method
  export const forgotpassword = async (req, res) => {
    try {
      const { id, token } = req.params;
      const validuser = await LoginProfiles.findOne({
        _id: id,
        verifytoken: token,
      });
  
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  
      console.log(verifyToken);
  
      if (validuser && verifyToken._id) {
        res.status(201).json({ status: 201, validuser });
      } else {
        res.status(401).json({ status: 401, message: "user not exist" });
      }
    } catch (error) {
      res.status(401).json({ status: 401, error });
    }
  };
  
  // @Desc change password
  // @METHOD  POST method
  export const changePassword = async (req, res) => {
    try {
      const { id, token } = req.params;
      const { password } = req.body;
  
      if (!id || !token || !password) {
        return res
          .status(400)
          .json({ status: 400, message: "Invalid input parameters" });
      }
      const validUser = await LoginProfiles.findOne({
        _id: id,
        verifytoken: token,
      });
  
      if (!validUser) {
        return res
          .status(401)
          .json({ status: 401, message: "User does not exist" });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const setNewUserPassword = await LoginProfiles.findByIdAndUpdate(id, {
        password: hashedPassword,
      });
  
      res
        .status(201)
        .json({ status: 201, message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  };
  