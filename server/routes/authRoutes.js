import express from "express";
import {
  signin,
  signup,
  google,
  signout,
  validateSession,
} from "../controllers/authController.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.get("/validate-session", verifyUserToken, validateSession);
router.post("/signup", signup);
router.post("/login", signin);
router.post("/google", google);
router.get("/signout", signout);

export default router;
