import express from "express";
import {
  createListing,
  deleteListing,
} from "../controllers/listingController.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.post("/create", verifyUserToken, createListing);
router.delete("/delete/:id", verifyUserToken, deleteListing);

export default router;
