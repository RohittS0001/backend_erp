import express from "express";
import {
  createDepartment,
  fetchDepartments,
  editDepartment,
  removeDepartment
} from "../../controllers/institute/departmentController.js";

const router = express.Router();

// Create Department
router.post("/add", createDepartment);

// Get All Departments
router.get("/all", fetchDepartments);

// Update Department
router.put("/update/:id", editDepartment);

// Delete Department
router.delete("/delete/:id", removeDepartment);

export default router;
