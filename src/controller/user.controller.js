import User from "../models/user.model.js"; // Importing User model
import createError from "../utils/createError.js"; // Importing utility function for creating errors
import Bcrypt from "bcrypt"; // Importing bcrypt for password hashing

// Controller function to create a new user
export const createUser = async (req, res, next) => {
  try {
    const { userName, email } = req.body; // Destructuring request body
    const isUserNameExist = await User.findOne({ userName }); // Checking if username already exists
    const isUserEmailExist = await User.findOne({ email }); // Checking if email already exists

    // If username or email already exist, return a 409 Conflict error
    if (isUserNameExist || isUserEmailExist) {
      return next(createError(409, "The user already exists"));
    }

    // Hashing the password
    const hash = Bcrypt.hashSync(req.body.password, 10);

    // Creating a new user object with hashed password
    let userData = new User({
      ...req.body,
      password: hash,
    });
    console.log(userData);
    // If user is admin, set userType to "Admin"
    if (req.body.isAdmin) {
      userData.userType = "Admin";
    }

    // Saving the new user
    await userData.save();

    // Sending response with user info (excluding password)
    const { password, ...info } = userData._doc;
    res.status(201).send(info);
  } catch (err) {
    next(err); // Handling errors
  }
};

// Controller function to delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Finding the user by ID

    // If user doesn't exist, return a 403 Forbidden error
    if (!user) return next(createError(403, "User not found!"));

    // Checking if the authenticated user is authorized to delete
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You are not authenticated!"));
    }

    // Deleting the user
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted."); // Sending response
  } catch (err) {
    next(err); // Handling errors
  }
};

// Controller function to get a specific user by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Finding the user by ID

    // If user doesn't exist, return a 404 Not Found error
    if (!user) return next(createError(404, "User not found"));

    // Sending response with the user
    res.status(200).send(user);
  } catch (err) {
    next(err); // Handling errors
  }
};

// Controller function to get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const Users = await User.find(); // Finding all users

    // If no users found, return a 404 Not Found error
    if (!Users) return next(createError(404, "User not found"));

    // Sending response with all users
    res.send(Users);
  } catch (err) {
    next(err); // Handling errors
  }
};
