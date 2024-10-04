import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You cannot update user password."));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    } else {
      delete req.body.password; // Avoid updating password if not provided
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    if (!updatedUser) return next(errorHandler(404, "User not found"));

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You cannot delete user."));
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next(errorHandler(404, "User not found"));
    }

    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only view your listings."));
  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json({
      success: true,
      message: "Listings retrieved successfully",
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return next(errorHandler(404, "User not found"));

    const { password: pass, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};
