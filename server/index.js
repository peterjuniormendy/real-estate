import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get((req, res) => {
  res.send("Hello world");
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
