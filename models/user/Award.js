import { pool } from "../../config/db.js"; // Adjust path if needed

// Utility: Ensure Award table exists (optional, call on startup)
export async function ensureAwardTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UserAward (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      recipient VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      details TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

// Create new award
export async function createAward({ title, recipient, date, details }) {
  const [result] = await pool.query(
    "INSERT INTO UserAward (title, recipient, date, details) VALUES (?, ?, ?, ?)",
    [title, recipient, date, details]
  );
  return { id: result.insertId, title, recipient, date, details };
}

// Get all awards
export async function getAwards() {
  const [rows] = await pool.query("SELECT * FROM UserAward");
  return rows;
}

// Get award by ID
export async function findAwardById(id) {
  const [rows] = await pool.query("SELECT * FROM UserAward WHERE id = ?", [id]);
  return rows;
}

// Update award by ID
export async function updateAward(id, { title, recipient, date, details }) {
  const [result] = await pool.query(
    "UPDATE UserAward SET title=?, recipient=?, date=?, details=? WHERE id=?",
    [title, recipient, date, details, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, title, recipient, date, details };
}

// Delete award by ID
export async function deleteAward(id) {
  const [result] = await pool.query("DELETE FROM UserAward WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
