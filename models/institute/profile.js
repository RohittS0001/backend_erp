import { pool } from "../../config/db.js";

// AUTO-CREATE profile TABLE
export async function ensureProfileTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS profile (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(50),
      address VARCHAR(255),
      role VARCHAR(100)
    );
  `);
}

// Get Profile (first/only row)
export async function getProfile() {
  const [rows] = await pool.query("SELECT * FROM profile LIMIT 1");
  return rows[0] || null;
}

// Create Profile
export async function createProfile(data) {
  const { name, email, phone, address, role } = data;

  const [result] = await pool.query(
    `INSERT INTO profile (name, email, phone, address, role)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, phone, address, role]
  );

  return {
    id: result.insertId,
    name,
    email,
    phone,
    address,
    role
  };
}

// Update Profile (always updates ID 1)
export async function updateProfileDB(data) {
  const { name, email, phone, address, role } = data;

  await pool.query(
    `UPDATE profile SET name=?, email=?, phone=?, address=?, role=? WHERE id=1`,
    [name, email, phone, address, role]
  );

  return {
    id: 1,
    name,
    email,
    phone,
    address,
    role
  };
}
