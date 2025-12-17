import express from "express";
import {
  registerUser,
  getUsers,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Get all users
router.get("/", getUsers);

// User login
router.post("/login", loginUser);

export default router;
