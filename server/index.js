import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "../server/routes/userRoutes.js";
import authRouter from "../server/routes/authRoutes.js";
import requestErrorMiddleware from "./middleware/requestErrorMiddleware.js";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// AUTH ROUTES
app.use("/api/auth", authRouter);

// USER ROUTES
app.use("/api/user", userRouter);

// Middleware for custom server error
app.use(requestErrorMiddleware);

const DB_URI = process.env.DB_URL;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("DB connected successfully, server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
