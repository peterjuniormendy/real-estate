import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const validateSession = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        isValid: false,
      });
    }

    res.status(200).json({
      success: true,
      isValid: true,
    });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
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
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json({ success: true, data: rest, message: "User signin successfully" });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.MY_SECRET);

      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        })
        .status(200)
        .json({
          success: true,
          data: rest,
          message: "User signin successfully",
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.username.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.avatar,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.MY_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        })
        .status(200)
        .json({
          success: true,
          data: rest,
          message: "User signin successfully",
        });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res
      .status(200)
      .json({ success: true, message: "User signout successfully" });
  } catch (error) {
    next(error);
  }
};
