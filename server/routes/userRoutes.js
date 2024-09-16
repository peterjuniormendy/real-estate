import express from "express";
import { updateUser } from "../controllers/userControllers.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.put("/update/:id", verifyUserToken, updateUser);

export default router;
