import { pool } from "../../config/db.js"; // Adjust path as needed

// Utility: Ensure Research Table Exists (Optional)
export async function ensureResearchTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UserResearch (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      researcherName VARCHAR(255) NOT NULL,
      startDate DATE NOT NULL,
      endDate DATE,
      summary TEXT,
      status VARCHAR(50) DEFAULT 'ongoing',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

// Create new research record
export async function createResearch({ title, researcherName, startDate, endDate, summary, status }) {
  const [result] = await pool.query(
    "INSERT INTO UserResearch (title, researcherName, startDate, endDate, summary, status) VALUES (?, ?, ?, ?, ?, ?)",
    [title, researcherName, startDate, endDate, summary, status || 'ongoing']
  );
  return { id: result.insertId, title, researcherName, startDate, endDate, summary, status: status || 'ongoing' };
}

// Get all research records
export async function getResearch() {
  const [rows] = await pool.query("SELECT * FROM UserResearch");
  return rows;
}

// Get research by ID
export async function findResearchById(id) {
  const [rows] = await pool.query("SELECT * FROM UserResearch WHERE id = ?", [id]);
  return rows[0];
}

// Update research by ID
export async function updateResearch(id, { title, researcherName, startDate, endDate, summary, status }) {
  const [result] = await pool.query(
    "UPDATE UserResearch SET title=?, researcherName=?, startDate=?, endDate=?, summary=?, status=? WHERE id=?",
    [title, researcherName, startDate, endDate, summary, status || 'ongoing', id]
  );
  if (result.affectedRows === 0) return null;
  return { id, title, researcherName, startDate, endDate, summary, status: status || 'ongoing' };
}

// Delete research by ID
export async function deleteResearch(id) {
  const [result] = await pool.query("DELETE FROM UserResearch WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
