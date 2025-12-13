import express from "express";
import { getDashboardStats } from "../../controllers/institute/dashboardController.js";

const router = express.Router();

// Dashboard statistics route
router.get("/dashboard-stats", getDashboardStats);

export default router;
