import { Router } from "express";
const router = Router();
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createUser,
  deleteUser,
  getUser,
  getAllUsers
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

router.post("/", verifyToken, isAdmin, createUser);
router.delete("/:id", verifyToken, isAdmin, deleteUser);
router.get("/:id", verifyToken, isAdmin, getUser);
router.get("/", verifyToken, isAdmin, getAllUsers);

export default router;
