import { pool } from "../../config/db.js";

// AUTO-CREATE reports TABLE
export async function ensureReportsTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reports (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Get all reports
export async function getReports() {
  const [rows] = await pool.query("SELECT * FROM reports ORDER BY id DESC");
  return rows;
}

// Add report
export async function addReport(data) {
  const { title, description } = data;

  const [result] = await pool.query(
    "INSERT INTO reports (title, description, created_at) VALUES (?, ?, NOW())",
    [title, description]
  );

  return {
    id: result.insertId,
    title,
    description,
    created_at: new Date()
  };
}

// Update report
export async function updateReport(id, data) {
  const { title, description } = data;

  await pool.query(
    "UPDATE reports SET title=?, description=? WHERE id=?",
    [title, description, id]
  );

  return {
    id,
    title,
    description
  };
}

// Delete report
export async function deleteReport(id) {
  const [result] = await pool.query("DELETE FROM reports WHERE id=?", [id]);
  return result.affectedRows > 0;
}

// Count reports
export async function countReports() {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS total FROM reports"
  );
  return rows[0].total;
}
