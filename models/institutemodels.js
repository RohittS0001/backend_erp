import { pool } from "../config/db.js";

// ======================================================
// 📌 AUTO-CREATE INSTITUTE LOGIN TABLE
// ======================================================
export async function ensureInstituteRecordTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS InstituteIDs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// ======================================================
// 📌 REGISTER INSTITUTE
// ======================================================
export async function createInstituteRecord({ email, password }) {
  const [result] = await pool.query(
    "INSERT INTO InstituteIDs (email, password) VALUES (?, ?)",
    [email.toLowerCase().trim(), password.trim()]
  );

  return {
    id: result.insertId,
    email
  };
}

// ======================================================
// 📌 LOGIN – FIND BY EMAIL
// ======================================================
export async function findInstituteByEmail(email) {
  const [rows] = await pool.query(
    "SELECT * FROM InstituteIDs WHERE email = ?",
    [email.toLowerCase().trim()]
  );

  return rows[0] || null;
}
