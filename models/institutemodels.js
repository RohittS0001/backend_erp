import { pool } from "../config/db.js";

// AUTO-CREATE InstituteIDs TABLE
export async function ensureInstituteRecordTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS InstituteIDs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

// CREATE new institute record (register)
export async function createInstituteRecord(data) {
  const { email, password } = data;

  const [result] = await pool.query(
    `INSERT INTO InstituteIDs (email, password) VALUES (?, ?)`,
    [email, password]
  );

  return {
    id: result.insertId,
    email,
    password
  };
}

// FIND institute record by email
export async function findInstituteByEmail(email) {
  const [rows] = await pool.query(
    `SELECT * FROM InstituteIDs WHERE email = ?`,
    [email]
  );

  return rows[0] || null;
}

// FIND institute record by ID
export async function findInstituteById(id) {
  const [rows] = await pool.query(
    `SELECT * FROM InstituteIDs WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
}

// UPDATE institute record
export async function updateInstituteRecord(id, data) {
  const fields = Object.keys(data)
    .map((key) => `${key}=?`)
    .join(",");

  const values = Object.values(data);

  await pool.query(
    `UPDATE InstituteIDs SET ${fields} WHERE id=?`,
    [...values, id]
  );

  return { id, ...data };
}

// DELETE institute record
export async function deleteInstituteRecord(id) {
  const [result] = await pool.query(
    `DELETE FROM InstituteIDs WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
}
