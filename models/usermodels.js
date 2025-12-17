import { pool } from "../config/db.js";

// Ensure Users table exists
export async function ensureUsersIDsTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Get all users
export async function getAllUsers() {
  const [rows] = await pool.query(
    "SELECT id, email, createdAt FROM Users"
  );
  return rows;
}

// Get user by email (for login)
export async function getUserByEmail(email) {
  const [rows] = await pool.query(
    "SELECT * FROM Users WHERE email = ?",
    [email.toLowerCase().trim()]
  );
  return rows[0] || null;
}

// Create new user
export async function createUser({ email, password }) {
  const [result] = await pool.query(
    "INSERT INTO Users (email, password) VALUES (?, ?)",
    [email.toLowerCase().trim(), password]
  );

  return {
    id: result.insertId,
    email: email.toLowerCase().trim(),
  };
}
