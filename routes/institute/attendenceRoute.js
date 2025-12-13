import express from "express";
import {
  markAttendance,
  getAllAttendance
} from "../../controllers/institute/attendanceController.js";

const router = express.Router();

router.post("/add", markAttendance);
router.get("/all", getAllAttendance);

export default router;
