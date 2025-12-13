// backend/routes/admin/reportsRoutes.js
import express from "express";
import {
  getAllReportsHandler,
  createReportHandler
} from "../../controllers/admin/reportsController.js";

const router = express.Router();

router.get("/", getAllReportsHandler);    // List reports
router.post("/", createReportHandler);    // Add report

export default router;
