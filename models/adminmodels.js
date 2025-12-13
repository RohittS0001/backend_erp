import { pool } from "../config/db.js";

// ADDED: Auto-create AdminsIDs table if it doesn't exist
export async function ensureAdminTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS AdminsIDs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `);
}

// Get all admins
export async function getAllAdmins() {
  const [rows] = await pool.query('SELECT * FROM AdminsIDs');
  return rows;
}

// Get admin by email
export async function getAdminByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM AdminsIDs WHERE email = ?', [email.toLowerCase().trim()]);
  return rows[0] || null;
}

// Create a new admin
export async function createAdmin(data) {
  const { email, password } = data;
  const [result] = await pool.query(
    'INSERT INTO AdminsIDs (email, password) VALUES (?, ?)',
    [email.toLowerCase().trim(), password]
  );
  return { id: result.insertId, email, password };
}

// Update admin by ID
export async function updateAdminById(id, data) {
  const { email, password } = data;
  const [result] = await pool.query(
    'UPDATE AdminsIDs SET email = ?, password = ? WHERE id = ?',
    [email.toLowerCase().trim(), password, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, email, password };
}

// Delete admin by ID
export async function deleteAdminById(id) {
  const [result] = await pool.query('DELETE FROM AdminsIDs WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
