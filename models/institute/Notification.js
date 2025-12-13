import { pool } from "../../config/db.js";

// AUTO-CREATE departments TABLE
export async function ensureDepartmentTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS departments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      head VARCHAR(255),
      description TEXT
    );
  `);
}

// GET all departments
export async function getDepartments() {
  const [rows] = await pool.query("SELECT * FROM departments ORDER BY id DESC");
  return rows;
}

// ADD department
export async function addDepartment(data) {
  const { name, head, description } = data;

  const [result] = await pool.query(
    "INSERT INTO departments (name, head, description) VALUES (?, ?, ?)",
    [name, head, description]
  );

  return {
    id: result.insertId,
    name,
    head,
    description
  };
}

// UPDATE department
export async function updateDepartment(id, data) {
  const { name, head, description } = data;

  await pool.query(
    "UPDATE departments SET name=?, head=?, description=? WHERE id=?",
    [name, head, description, id]
  );

  return {
    id,
    name,
    head,
    description
  };
}

// DELETE department
export async function deleteDepartment(id) {
  const [result] = await pool.query("DELETE FROM departments WHERE id=?", [id]);
  return result.affectedRows > 0;
}
