import express from "express";
import {
  registerAdminHandler,
  getAdminsHandler,
  loginAdminHandler
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdminHandler);
router.get("/", getAdminsHandler);
router.post("/login", loginAdminHandler);

export default router;
