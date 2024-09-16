import express from "express";
import {
  signin,
  signup,
  google,
  signout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.post("/google", google);
router.get("/signout", signout);

export default router;
