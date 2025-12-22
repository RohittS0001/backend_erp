import { pool } from "../config/db.js";

// Auto-create Users table
export async function ensureUsersIDsTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UsersID (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      role ENUM('user', 'institute') NOT NULL DEFAULT 'user'
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

// Create a new user  ✅ CHANGED to store name, phone, role
export async function createUser(data) {
  const { name, email, password, phone, role } = data;

  const [result] = await pool.query(
    "INSERT INTO UsersIDs (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
    [
      name || null,
      email.toLowerCase().trim(),
      password.trim(),
      phone || null,
      (role || "user").toLowerCase().trim()
    ]
  );

  return {
    id: result.insertId,
    name: name || null,
    email: email.toLowerCase().trim(),
    phone: phone || null,
    role: (role || "user").toLowerCase().trim()
  };
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
