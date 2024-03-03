import { Router } from 'express';
const router = Router();

import {createUser, deleteUser, getUser, getAllUsers} from '../controller/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

router.post("/", createUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getAllUsers);

export default router;