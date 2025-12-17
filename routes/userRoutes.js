import express from "express";
import {
  registerUserHandler,
  getUsersHandler,
  loginUserHandler
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUserHandler);
router.get("/", getUsersHandler);
router.post("/login", loginUserHandler);

export default router;
