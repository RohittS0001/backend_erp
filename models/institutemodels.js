// models/institutemodels.js
import { pool } from "../config/db.js";

// Auto-create Institutes table (for login)
export async function ensureInstituteTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS InstitutesIDs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `);
}

// Get all institutes
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

// Create a new institute
export async function createInstitute(data) {
  const { email, password } = data;
  const [result] = await pool.query(
    "INSERT INTO InstitutesIDs (email, password) VALUES (?, ?)",
    [email.toLowerCase().trim(), password]
  );
  return { id: result.insertId, email, password };
}

// (Optional) update/delete similar to user if ever needed
