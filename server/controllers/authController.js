import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { nextTick } from "process";

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
