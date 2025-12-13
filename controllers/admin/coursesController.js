import {
  getAllCourses,
  getCourseCount,
  createCourse,
  updateCourseById,
  deleteCourseById
} from '../../models/admin/Course.js';


// Get all courses
export const getAllCoursesHandler = async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Get total course count
export const getCourseCountHandler = async (req, res) => {
  try {
    const count = await getCourseCount();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course count' });
  }
};

// Create a new course
export const createCourseHandler = async (req, res) => {
  try {
    const saved = await createCourse(req.body);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add course' });
  }
};

// Edit/update a course by ID
export const updateCourseHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updateCourseById(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Course not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update course' });
  }
};

// Delete a course by ID
export const deleteCourseHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteCourseById(id);
    if (!deleted) return res.status(404).json({ error: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};
