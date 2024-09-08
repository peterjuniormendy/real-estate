import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res.status(201).json({
      message: "User register successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    // compare password
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return next(errorHandler(401, "Wrong credentials!"));

    // authenticate user
    const token = jwt.sign({ id: user._id }, process.env.MY_SECRET);
    // reture everything in user except password
    const { password: pass, ...rest } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({ data: rest, message: "User signin successfully" });
  } catch (error) {
    next(error);
  }
  User.findOne({ email });
};
