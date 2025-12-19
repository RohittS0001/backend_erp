// models/institutemodels.js
import { pool } from "../config/db.js";

// Auto-create InstitutesIDs table (for login)
export async function ensureInstituteTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS InstitutesIDs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `);
}

// Get all institutes (login identities)
export async function getAllInstitutes() {
  const [rows] = await pool.query("SELECT * FROM InstitutesIDs");
  return rows;
}

// Get institute by email
export async function getInstituteByEmail(email) {
  const [rows] = await pool.query(
    "SELECT * FROM InstitutesIDs WHERE email = ?",
    [email.toLowerCase().trim()]
  );
  return rows[0] || null;
}

// Create a new institute login
export async function createInstitute(data) {
  const { email, password } = data;
  const [result] = await pool.query(
    "INSERT INTO InstitutesIDs (email, password) VALUES (?, ?)",
    [email.toLowerCase().trim(), password.trim()]
  );
  return { id: result.insertId, email: email.toLowerCase().trim(), password: password.trim() };
}

// Update institute by ID
export async function updateInstituteById(id, data) {
  const { email, password } = data;
  const [result] = await pool.query(
    "UPDATE InstitutesIDs SET email = ?, password = ? WHERE id = ?",
    [email.toLowerCase().trim(), password.trim(), id]
  );
  if (result.affectedRows === 0) return null;
  return { id, email: email.toLowerCase().trim(), password: password.trim() };
}

// Delete institute by ID
export async function deleteInstituteById(id) {
  const [result] = await pool.query(
    "DELETE FROM InstitutesIDs WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
