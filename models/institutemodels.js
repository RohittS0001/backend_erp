import { pool } from "../config/db.js";

// CREATE TABLE IF NOT EXISTS for Institutes
export async function ensureInstituteTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Institutes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(50)
    );
  `);
}

// Get all institutes
export async function getAllInstitutes() {
  const [rows] = await pool.query('SELECT * FROM Institutes');
  return rows;
}

// Get institute by ID
export async function getInstituteById(id) {
  const [rows] = await pool.query('SELECT * FROM Institutes WHERE id = ?', [id]);
  return rows[0] || null;
}

// Create a new institute
export async function createInstitute(data) {
  const { name, address, email, phone } = data;
  const [result] = await pool.query(
    'INSERT INTO Institutes (name, address, email, phone) VALUES (?, ?, ?, ?)',
    [name.trim(), address?.trim() || null, email?.toLowerCase().trim() || null, phone || null]
  );
  return { id: result.insertId, name, address, email, phone };
}

// Update institute by ID
export async function updateInstituteById(id, data) {
  const { name, address, email, phone } = data;
  const [result] = await pool.query(
    'UPDATE Institutes SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?',
    [name.trim(), address?.trim() || null, email?.toLowerCase().trim() || null, phone || null, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, name, address, email, phone };
}

// Delete institute by ID
export async function deleteInstituteById(id) {
  const [result] = await pool.query('DELETE FROM Institutes WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
