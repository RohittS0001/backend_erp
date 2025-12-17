import { pool } from "../config/db.js";

// Auto-create Users table
export async function ensureUsersIDsTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UsersIDs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `);
}

// Get all users
export async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM UsersIDs");
  return rows;
}

// Get user by email
export async function getUserByEmail(email) {
  const [rows] = await pool.query(
    "SELECT * FROM UsersIDs WHERE email = ?",
    [email.toLowerCase().trim()]
  );
  return rows[0] || null;
}

// Create a new user
export async function createUser(data) {
  const { email, password } = data;
  const [result] = await pool.query(
    "INSERT INTO UsersIDs (email, password) VALUES (?, ?)",
    [email.toLowerCase().trim(), password]
  );
  return { id: result.insertId, email, password };
}

// Update user by ID
export async function updateUserById(id, data) {
  const { email, password } = data;
  const [result] = await pool.query(
    "UPDATE UsersIDs SET email = ?, password = ? WHERE id = ?",
    [email.toLowerCase().trim(), password, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, email, password };
}

// Delete user by ID
export async function deleteUserById(id) {
  const [result] = await pool.query(
    "DELETE FROM UsersIDs WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
