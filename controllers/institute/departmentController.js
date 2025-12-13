import {
  addDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  countDepartments
} from "../../models/institute/department.js";

// CREATE Department
export const createDepartment = async (req, res) => {
  try {
    const id = await addDepartment(req.body);
    res.json({ success: true, message: "Department created", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all departments
export const fetchDepartments = async (req, res) => {
  try {
    const departments = await getDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE department
export const editDepartment = async (req, res) => {
  try {
    await updateDepartment(req.params.id, req.body);
    res.json({ success: true, message: "Department updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE department
export const removeDepartment = async (req, res) => {
  try {
    await deleteDepartment(req.params.id);
    res.json({ success: true, message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
