import {pool} from "../../config/db.js"; // Adjust the path as necessary

// Utility: Ensure User Table Exists (Optional)
export async function ensureu_UserTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      role ENUM('user', 'admin', 'institute') NOT NULL,
      password VARCHAR(255) NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Create a new user record
export async function createUser({ name, email, role, password }) {
  const [result] = await pool.query(
    "INSERT INTO User (name, email, role, password) VALUES (?, ?, ?, ?)",
    [name, email, role, password]
  );
  return { id: result.insertId, name, email, role, password };
}

// Get all users
export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM User");
  return rows;
}

// Get user by ID
export async function findUserById(id) {
  const [rows] = await pool.query("SELECT * FROM User WHERE id = ?", [id]);
  return rows[0];
}

// Get user by email (for login/security)
export async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM User WHERE email = ?", [email]);
  return rows[0];
}

// Update user by ID
export async function updateUserById(id, { name, email, role, password }) {
  const [result] = await pool.query(
    "UPDATE User SET name=?, email=?, role=?, password=? WHERE id=?",
    [name, email, role, password, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, name, email, role, password };
}

// Delete user by ID
export async function deleteUserById(id) {
  const [result] = await pool.query("DELETE FROM User WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
