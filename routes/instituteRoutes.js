import express from "express";
import {
  registerInstitute,
  loginInstitute,
  getInstituteDashboard
} from "../controllers/instituteController.js";

const router = express.Router();

// ======================================================
// 📌 AUTH ROUTES
// ======================================================
router.post("/register", registerInstitute); // ✅ ADDED
router.post("/login", loginInstitute);       // ✅ ADDED

// ======================================================
// 📌 DASHBOARD
// ======================================================
router.get("/dashboard", getInstituteDashboard);

export default router;
