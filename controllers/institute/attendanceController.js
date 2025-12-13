import { pool } from "../../config/db.js";  // ✅ CORRECT


// ADD attendance
export const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create({
      studentName: req.body.studentName,
      role: req.body.role || "Student",
      date: req.body.date,
      status: req.body.status
    });

    res.json({ success: true, attendance });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL attendance
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.findAll();
    res.json(records);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
