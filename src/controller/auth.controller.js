import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import jwt from "jsonwebtoken"; // Importing JWT for token generation and verification
import User from "../models/user.model.js"; // Importing User model
import { JWT_KEY } from "../config/config.js"; // Importing JWT key from configuration
import createError from "../utils/createError.js"; // Importing utility function for creating errors

// Controller function for user login
export const login = async (req, res, next) => {
  try {
    // Check if user is already logged in
    if (req.cookies.accessToken) {
      return next(createError(409, "User is already logged in."));
    }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Compare provided password with hashed password from database
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Wrong password or username"));

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id, // Include user ID in token payload
        userType: user.userType, // Include user type in token payload
        isAdmin:user.isAdmin
      },
      JWT_KEY
    );

    // Exclude password field from user data
    const { password, ...info } = user._doc;

    // Set JWT token in cookie and send user info in response
    res.cookie("accessToken", token, { httpOnly: false }).status(200).send(info);
  } catch (err) {
    next(err); // Handling errors
  }
};

// Controller function for user logout
export const logout = async (req, res, next) => {
  // Check if user is already logged out
  if (!req.accessToken) return next(createError(200, "Already logged out"));
  
  // Clear JWT token from cookie and send response
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
