import { pool } from "../../config/db.js";

// AUTO-CREATE courses TABLE
export async function ensureCourseTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      code VARCHAR(100) NOT NULL,
      department VARCHAR(255),
      duration VARCHAR(100),
      credits INT DEFAULT 4
    );
  `);
}

// Get all courses
export async function getCourses() {
  const [rows] = await pool.query("SELECT * FROM courses ORDER BY id DESC");
  return rows;
}

// Add a new course
export async function addCourse(data) {
  const { name, code, department, duration, credits } = data;

  const [result] = await pool.query(
    "INSERT INTO courses (name, code, department, duration, credits) VALUES (?, ?, ?, ?, ?)",
    [name, code, department, duration, credits]
  );

  return {
    id: result.insertId,
    name,
    code,
    department,
    duration,
    credits,
  };
}

// Update course by ID
export async function updateCourse(id, data) {
  const { name, code, department, duration, credits } = data;

  await pool.query(
    "UPDATE courses SET name=?, code=?, department=?, duration=?, credits=? WHERE id=?",
    [name, code, department, duration, credits, id]
  );

  return {
    id,
    name,
    code,
    department,
    duration,
    credits,
  };
}

// Delete a course by ID
export async function deleteCourse(id) {
  const [result] = await pool.query("DELETE FROM courses WHERE id=?", [id]);
  return result.affectedRows > 0;
}

// Count courses (for dashboard)
export async function countCourses() {
  const [rows] = await pool.query("SELECT COUNT(*) AS total FROM courses");
  return rows[0].total;
}
