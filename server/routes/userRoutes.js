import express from "express";
import { updateUser, deleteUser } from "../controllers/userControllers.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.put("/update/:id", verifyUserToken, updateUser);
router.delete("/delete/:id", verifyUserToken, deleteUser);

export default router;
