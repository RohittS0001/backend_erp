import { pool } from "../../config/db.js"; // Adjust path as needed

// Utility: Ensure Immersion Table Exists (Optional)
export async function ensureImmersionTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UserImmersion (
      id INT AUTO_INCREMENT PRIMARY KEY,
      program VARCHAR(255) NOT NULL,
      institution VARCHAR(255) NOT NULL,
      startDate DATE NOT NULL,
      endDate DATE NOT NULL,
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

// Create new immersion record
export async function createImmersion({ program, institution, startDate, endDate, description }) {
  const [result] = await pool.query(
    "INSERT INTO UserImmersion (program, institution, startDate, endDate, description) VALUES (?, ?, ?, ?, ?)",
    [program, institution, startDate, endDate, description]
  );
  return { id: result.insertId, program, institution, startDate, endDate, description };
}

// Get all immersions
export async function getImmersions() {
  const [rows] = await pool.query("SELECT * FROM UserImmersion");
  return rows;
}

// Get immersion by ID
export async function findImmersionById(id) {
  const [rows] = await pool.query("SELECT * FROM UserImmersion WHERE id = ?", [id]);
  return rows[0];
}

// Update immersion by ID
export async function updateImmersion(id, { program, institution, startDate, endDate, description }) {
  const [result] = await pool.query(
    "UPDATE UserImmersion SET program=?, institution=?, startDate=?, endDate=?, description=? WHERE id=?",
    [program, institution, startDate, endDate, description, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, program, institution, startDate, endDate, description };
}

// Delete immersion by ID
export async function deleteImmersion(id) {
  const [result] = await pool.query("DELETE FROM UserImmersion WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
