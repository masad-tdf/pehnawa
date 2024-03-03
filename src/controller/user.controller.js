import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import Bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  try {
    const { userName, email } = req.body;
    const isUserNameExist = await User.findOne({ userName });
    const isUserEmailExist = await User.findOne({ email });
    if (isUserNameExist || isUserEmailExist) {
      return next(createError(409, "The User is already exist"));
    }
    const hash = Bcrypt.hashSync(req.body.password, 10);
    const userData = new User({
      ...req.body,
      password: hash,
    });
    await userData.save();
    // Set the access token in a cookie
    const { password, ...info } = userData._doc;
    // Set the access token in a cookie
    res.status(201).send(info);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(403, "User not found!"));

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "Your are not authenticated!"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const Users = await User.find();
    if (!Users) return next(createError(404, "User not found"));
  } catch (err) {
    next(err);
  }
};
