import { pool } from '../../config/db.js';

// ADDED: Auto-create AdminCourses table if it doesn't exist
export async function ensureCourseTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS AdminCourses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      duration VARCHAR(50),
      instructor VARCHAR(100),
      status VARCHAR(20) DEFAULT 'Active'
    );
  `);
}

// Get all courses
export async function getAllCourses() {
  const [rows] = await pool.query('SELECT * FROM AdminCourses');
  return rows;
}

// Get total course count
export async function getCourseCount() {
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM AdminCourses');
  return rows[0].count;
}

// Create a new course
export async function createCourse(data) {
  const { title, duration, instructor, status = 'Active' } = data;
  const [result] = await pool.query(
    'INSERT INTO AdminCourses (title, duration, instructor, status) VALUES (?, ?, ?, ?)',
    [title, duration, instructor, status]
  );
  return { id: result.insertId, title, duration, instructor, status };
}

// Update a course by ID
export async function updateCourseById(id, data) {
  const { title, duration, instructor, status } = data;
  const [result] = await pool.query(
    'UPDATE AdminCourses SET title=?, duration=?, instructor=?, status=? WHERE id=?',
    [title, duration, instructor, status, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, title, duration, instructor, status };
}

// Delete a course by ID
export async function deleteCourseById(id) {
  const [result] = await pool.query('DELETE FROM AdminCourses WHERE id=?', [id]);
  return result.affectedRows > 0;
}
