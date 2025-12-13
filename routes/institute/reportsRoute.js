import express from "express";
import {
  fetchReports,
  createReport,
  editReport,
  removeReport
} from "../../controllers/institute/reportController.js";

const router = express.Router();

// GET all reports
router.get("/all", fetchReports);

// CREATE report
router.post("/add", createReport);

// UPDATE report
router.put("/update/:id", editReport);

// DELETE report
router.delete("/delete/:id", removeReport);

export default router;
