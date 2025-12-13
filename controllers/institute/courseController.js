import { pool } from "../../config/db.js";  // ✅ CORRECT


// Add course
export const addCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    return res.json({ success: true, course });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    return res.json({ success: true, courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const [updated] = await Course.update(req.body, {
      where: { id: req.params.id }
    });

    return res.json({ success: true, updatedRows: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.destroy({
      where: { id: req.params.id }
    });

    return res.json({ success: true, deletedRows: deleted });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
