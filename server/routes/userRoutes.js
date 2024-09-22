import express from "express";
import {
  updateUser,
  deleteUser,
  getUserListings,
} from "../controllers/userControllers.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.put("/update/:id", verifyUserToken, updateUser);
router.delete("/delete/:id", verifyUserToken, deleteUser);
router.get("/listings/:id", verifyUserToken, getUserListings);

export default router;
