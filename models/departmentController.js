import { sequelize } from "../../config/db.js";
import Department from "../../models/institute/Department.js";

// Add department
export const addDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.json({ success: true, department });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const list = await Department.findAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
