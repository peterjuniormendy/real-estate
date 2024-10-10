import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListingByID,
  getListings,
} from "../controllers/listingController.js";
import { verifyUserToken } from "../utils/verifyUserToken.js";

const router = express.Router();

router.post("/create", verifyUserToken, createListing);
router.delete("/delete/:id", verifyUserToken, deleteListing);
router.put("/update/:id", verifyUserToken, updateListing);
router.get("/get/:id", getListingByID);
router.get("/get", getListings);

export default router;
