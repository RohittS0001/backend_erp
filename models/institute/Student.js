import { pool } from "../../config/db.js";

// AUTO-CREATE students TABLE
export async function ensureStudentTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      roll VARCHAR(100) NOT NULL,
      branch VARCHAR(255),
      email VARCHAR(255)
    );
  `);
}

// Get all students
export async function getStudents() {
  const [rows] = await pool.query("SELECT * FROM students ORDER BY id DESC");
  return rows;
}

// Add a student
export async function addStudent(data) {
  const { name, roll, branch, email } = data;

  const [result] = await pool.query(
    "INSERT INTO students (name, roll, branch, email) VALUES (?, ?, ?, ?)",
    [name, roll, branch, email]
  );

  return {
    id: result.insertId,
    name,
    roll,
    branch,
    email
  };
}

// Update student
export async function updateStudent(id, data) {
  const { name, roll, branch, email } = data;

  await pool.query(
    "UPDATE students SET name=?, roll=?, branch=?, email=? WHERE id=?",
    [name, roll, branch, email, id]
  );

  return {
    id,
    name,
    roll,
    branch,
    email
  };
}

// Delete student
export async function deleteStudent(id) {
  const [result] = await pool.query("DELETE FROM students WHERE id=?", [id]);
  return result.affectedRows > 0;
}

// Count students
export async function countStudents() {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS total FROM students"
  );
  return rows[0].total;
}
