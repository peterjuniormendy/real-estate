import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyUserToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return errorHandler(401, "Unauthorized");

  jwt.verify(token, process.env.MY_SECRET, (err, id) => {
    if (err) return errorHandler(403, "Forbidden");
    req.user = id;
    next();
  });
};
