import { pool } from "../../config/db.js";

// AUTO-CREATE Institute TABLE
export async function ensureInstitutesTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS institute (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      establishedYear INT,
      affiliation VARCHAR(255)
    );
  `);
}

// Get Institute details (assuming only ONE record)
export async function getInstitute() {
  const [rows] = await pool.query("SELECT * FROM institute LIMIT 1");
  return rows[0] || null;
}

// Create Institute (only if not exists)
export async function createInstitute(data) {
  const { name, address, establishedYear, affiliation } = data;

  const [result] = await pool.query(
    `INSERT INTO institute (name, address, establishedYear, affiliation)
     VALUES (?, ?, ?, ?)`,
    [name, address, establishedYear, affiliation]
  );

  return {
    id: result.insertId,
    name,
    address,
    establishedYear,
    affiliation
  };
}

// Update Institute (single-row update)
export async function updateInstitute(id, data) {
  const { name, address, establishedYear, affiliation } = data;

  await pool.query(
    `UPDATE institute SET name=?, address=?, establishedYear=?, affiliation=?
     WHERE id=?`,
    [name, address, establishedYear, affiliation, id]
  );

  return {
    id,
    name,
    address,
    establishedYear,
    affiliation
  };
}

// Delete Institute (rare but included)
export async function deleteInstitute(id) {
  const [result] = await pool.query(
    "DELETE FROM institute WHERE id=?",
    [id]
  );
  return result.affectedRows > 0;
}
