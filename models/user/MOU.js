import { pool } from "../../config/db.js"; // Adjust path as necessary

// Utility: Ensure MOU Table Exists (Optional)
export async function ensureMOUTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UserMOU (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      partnerOrganization VARCHAR(255) NOT NULL,
      startDate DATE NOT NULL,
      endDate DATE,
      description TEXT,
      status VARCHAR(50) DEFAULT 'active',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

// Create new MOU
export async function createMOU({ title, partnerOrganization, startDate, endDate, description, status }) {
  const [result] = await pool.query(
    "INSERT INTO UserMOU (title, partnerOrganization, startDate, endDate, description, status) VALUES (?, ?, ?, ?, ?, ?)",
    [title, partnerOrganization, startDate, endDate, description, status || 'active']
  );
  return { id: result.insertId, title, partnerOrganization, startDate, endDate, description, status: status || 'active' };
}

// Get all MOUs
export async function getMOUs() {
  const [rows] = await pool.query("SELECT * FROM UserMOU");
  return rows;
}

// Get MOU by ID
export async function findMOUById(id) {
  const [rows] = await pool.query("SELECT * FROM UserMOU WHERE id = ?", [id]);
  return rows[0];
}

// Update MOU by ID
export async function updateMOU(id, { title, partnerOrganization, startDate, endDate, description, status }) {
  const [result] = await pool.query(
    "UPDATE UserMOU SET title=?, partnerOrganization=?, startDate=?, endDate=?, description=?, status=? WHERE id=?",
    [title, partnerOrganization, startDate, endDate, description, status || 'active', id]
  );
  if (result.affectedRows === 0) return null;
  return { id, title, partnerOrganization, startDate, endDate, description, status: status || 'active' };
}

// Delete MOU by ID
export async function deleteMOU(id) {
  const [result] = await pool.query("DELETE FROM UserMOU WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
