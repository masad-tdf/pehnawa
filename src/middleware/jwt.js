import createError from "../utils/createError.js"; // Importing utility function for creating errors
import jwt from "jsonwebtoken"; // Importing JSON Web Token library
import { JWT_KEY } from "../config/config.js"; // Importing JWT key from configuration

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  var token;
  if (authHeader)
    token = authHeader.split(" ")[1]; // Extracting token from cookies
  else token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!")); // If token is not present, return 401 Unauthorized error
  console.log(token);
  // Verifying the token
  jwt.verify(token, JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid")); // If token is not valid, return 403 Forbidden error
    console.log(payload);
    // If token is valid, extract user ID and user type from payload and attach them to request object
    req.userId = payload.id;
    req.userType = payload.userType;
    req.isAdmin = payload.isAdmin;

    next(); // Proceed to the next middleware
  });
};
