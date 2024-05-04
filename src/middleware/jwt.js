import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/config.js";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  // Attempt to extract token from both headers and cookies (if configured)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]; // Extract token from Bearer authorization
  } else {
    token = req.cookies && req.cookies.accessToken; // Check for cookie-based token
  }

  // If no token found, return 401 Unauthorized error
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  // Verification using a try-catch block for better error handling
  try {
    console.log(token);
    const decoded = jwt.verify(token, JWT_KEY);
    req.userId = decoded.id;
    req.userType = decoded.userType;
    req.isAdmin = decoded.isAdmin;
    next(); // Proceed to the next middleware
  } catch (err) {
    // Handle token verification errors appropriately
    if (err.name === 'JsonWebTokenError') { // JWT signature verification failed
      return next(createError(403, "Invalid token signature"));
    } else if (err.name === 'TokenExpiredError') { // Token has expired
      return next(createError(401, "Token expired! Please log in again"));
    } else { // Other token errors
      return next(createError(400, "Error verifying token"));
    }
  }
};
