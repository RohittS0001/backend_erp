// backend/routes/admin/dashboardRoutes.js
import express from "express";
import { getDashboardData } from "../../controllers/admin/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardData);

export default router;
