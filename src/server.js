import express from "express"; // Importing Express framework
import { PORT } from "../src/config/config.js"; // Importing port configuration
import "./config/db.js"; // Importing database configuration
import cookieParser from "cookie-parser"; // Importing cookie-parser middleware
import cors from 'cors'; // Importing cors middleware for cross-origin requests

import userRoute from "./routes/user.route.js"; // Importing user routes
import authRoute from "./routes/auth.route.js"; // Importing authentication routes
import productRoute from "./routes/product.route.js"; // Importing product routes
import orderRoute from "./routes/order.route.js";

const app = express(); // Creating Express application

// Middleware for allowing cross-origin requests from http://localhost:5173 and enabling credentials
app.use(cors({origin:"http://localhost:3000", credentials:true}));

app.use(express.json()); // Middleware for parsing JSON request bodies
app.use(cookieParser()); // Middleware for parsing cookies

// Routes
app.use("/api/user", userRoute); // Mounting user routes at /api/user
app.use("/api/auth", authRoute); // Mounting authentication routes at /api/auth
app.use("/api/product", productRoute); // Mounting product routes at /api/product
app.use("/api/order", orderRoute);

// Error handling middleware
app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500; // Getting error status
  const errorMessage = err.message || "Something went wrong!"; // Getting error message

  return res.status(errorStatus).send(errorMessage); // Sending error response
})

app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`); // Listening on the configured port
});
