import express from "express";
import {
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
} from "../controllers/userControllers.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.put("/update/:id", verifyUserToken, updateUser);
router.delete("/delete/:id", verifyUserToken, deleteUser);
router.get("/listings/:id", verifyUserToken, getUserListings);
router.get("/:id", verifyUserToken, getUser);

export default router;
