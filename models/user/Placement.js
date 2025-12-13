import { pool } from "../../config/db.js"; // Adjust the path as needed

// Utility: Ensure Placement Table Exists (Optional)
export async function ensurePlacementTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UserPlacement (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentName VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      package DECIMAL(15,2),
      dateOfPlacement DATE NOT NULL,
      status VARCHAR(50) DEFAULT 'placed',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

// Create new placement record
export async function createPlacement({ studentName, company, position, package: pkg, dateOfPlacement, status }) {
  const [result] = await pool.query(
    "INSERT INTO UserPlacement (studentName, company, position, package, dateOfPlacement, status) VALUES (?, ?, ?, ?, ?, ?)",
    [studentName, company, position, pkg, dateOfPlacement, status || 'placed']
  );
  return { id: result.insertId, studentName, company, position, package: pkg, dateOfPlacement, status: status || 'placed' };
}

// Get all placement records
export async function getPlacements() {
  const [rows] = await pool.query("SELECT * FROM UserPlacement");
  return rows;
}

// Get placement by ID
export async function findPlacementById(id) {
  const [rows] = await pool.query("SELECT * FROM UserPlacement WHERE id = ?", [id]);
  return rows[0];
}

// Update placement by ID
export async function updatePlacement(id, { studentName, company, position, package: pkg, dateOfPlacement, status }) {
  const [result] = await pool.query(
    "UPDATE UserPlacement SET studentName=?, company=?, position=?, package=?, dateOfPlacement=?, status=? WHERE id=?",
    [studentName, company, position, pkg, dateOfPlacement, status || 'placed', id]
  );
  if (result.affectedRows === 0) return null;
  return { id, studentName, company, position, package: pkg, dateOfPlacement, status: status || 'placed' };
}

// Delete placement by ID
export async function deletePlacement(id) {
  const [result] = await pool.query("DELETE FROM UserPlacement WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
