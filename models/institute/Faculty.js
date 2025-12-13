import { pool } from "../../config/db.js";

// AUTO-CREATE faculty TABLE
export async function ensureFacultyTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS faculty (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      department VARCHAR(255),
      designation VARCHAR(255)
    )
  `);
}

// Get all faculty
export async function getFaculty() {
  const [rows] = await pool.query("SELECT * FROM faculty ORDER BY id DESC");
  return rows;
}

// Add a faculty member
export async function addFaculty(data) {
  const { name, email, department, designation } = data;

  const [result] = await pool.query(
    "INSERT INTO faculty (name, email, department, designation) VALUES (?, ?, ?, ?)",
    [name, email, department, designation]
  );

  return {
    id: result.insertId,
    name,
    email,
    department,
    designation
  };
}

// Update faculty
export async function updateFaculty(id, data) {
  const { name, email, department, designation } = data;

  await pool.query(
    "UPDATE faculty SET name=?, email=?, department=?, designation=? WHERE id=?",
    [name, email, department, designation, id]
  );

  return {
    id,
    name,
    email,
    department,
    designation
  };
}

// Delete faculty
export async function deleteFaculty(id) {
  const [result] = await pool.query("DELETE FROM faculty WHERE id=?", [id]);
  return result.affectedRows > 0;
}

// Count faculty (for dashboard)
export async function countFaculty() {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS total FROM faculty"
  );
  return rows[0].total;
}
