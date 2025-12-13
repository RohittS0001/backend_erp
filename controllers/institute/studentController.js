
import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  countStudents
} from "../../models/institute/Student.js";

// CREATE student
export const createStudent = async (req, res) => {
  try {
    const id = await addStudent(req.body);
    res.json({ success: true, message: "Student created", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all students
export const fetchStudents = async (req, res) => {
  try {
    const rows = await getStudents();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE student
export const editStudent = async (req, res) => {
  try {
    await updateStudent(req.params.id, req.body);
    res.json({ success: true, message: "Student updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE student
export const removeStudent = async (req, res) => {
  try {
    await deleteStudent(req.params.id);
    res.json({ success: true, message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
