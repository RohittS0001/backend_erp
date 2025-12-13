import { pool } from "../../config/db.js";  // ✅ CORRECT




export const addFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.json({ success: true, faculty });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.findAll();
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const [updated] = await Faculty.update(req.body, { where: { id: req.params.id }});
    res.json({ success: true, updatedRows: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    const deleted = await Faculty.destroy({ where: { id: req.params.id }});
    res.json({ success: true, deletedRows: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
