import { Router } from "express"; // Importing Router from Express
const router = Router(); // Creating a new router instance

import { verifyToken } from "../middleware/jwt.js"; // Importing JWT verification middleware
import { isManager } from "../middleware/isManager.js"; // Importing manager authorization middleware
import {
  createProduct,
  updateProduct,
  getProduct,
  getAllProduct,
  deleteProduct,
} from "../controller/product.controller.js"; // Importing controller functions for product operations

// Route to create a new product
router.post("/", verifyToken, isManager, createProduct);

// Route to update a product by ID
router.post("/:id", verifyToken, isManager, updateProduct);

// Route to get all products
router.get("/", getAllProduct);

// Route to get a product by ID
router.get("/:id", getProduct);

// Route to delete a product by ID
router.delete("/:id", verifyToken, isManager, deleteProduct);

export default router; // Exporting the router
