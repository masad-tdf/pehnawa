import { Router } from "express";
const router = Router();

import { verifyToken } from "../middleware/jwt.js";
import { isManager } from "../middleware/isManager.js";

import {
    placeOrder,
    updateOrder,
    getAllOrders,
    getOrder,
    deleteOrder
} from '../controller/order.controller.js';

router.post("/", placeOrder);
router.get("/all/:status", verifyToken, isManager, getAllOrders);
router.get("/:id", verifyToken, isManager, getOrder);
router.post("/:id", verifyToken, isManager, updateOrder);
router.delete("/:id", verifyToken, isManager, deleteOrder);

export default router;