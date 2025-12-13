import express from "express";
import {
  createStudent,
  fetchStudents,
  editStudent,
  removeStudent
} from "../../controllers/institute/studentController.js";

const router = express.Router();

// ADD Student
router.post("/add", createStudent);

// GET All Students
router.get("/all", fetchStudents);

// UPDATE Student
router.put("/update/:id", editStudent);

// DELETE Student
router.delete("/delete/:id", removeStudent);

export default router;

