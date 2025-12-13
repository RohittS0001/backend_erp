import express from "express";
import {
  getAllUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../../controllers/admin/usersController.js";

const router = express.Router();

router.get("/", getAllUsersHandler);          // List users
router.post("/", createUserHandler);          // Add new user
router.put("/:id", updateUserHandler);        // Update user by ID
router.delete("/:id", deleteUserHandler);     // Delete user by ID

export default router;
