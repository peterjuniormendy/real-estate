import express from "express";
import { signin, signup, google } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.post("/google", google);

export default router;
