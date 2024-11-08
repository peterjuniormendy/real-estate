import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "../server/routes/userRoutes.js";
import authRouter from "../server/routes/authRoutes.js";
import listingRouter from "../server/routes/listingRoutes.js";
import requestErrorMiddleware from "./middleware/requestErrorMiddleware.js";
import path from "path";
const app = express();

const __dirname = path.resolve();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL // Add this to your .env file
        : "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// AUTH ROUTES
app.use("/api/auth", authRouter);

// USER ROUTES
app.use("/api/user", userRouter);

// LISTING ROUTE
app.use("/api/listing", listingRouter);

// Middleware for custom server error
app.use(requestErrorMiddleware);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

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
