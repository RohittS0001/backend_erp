import { pool } from "../config/db.js";

// Create table for students (runs once)
export const createStudentTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      rollNo VARCHAR(50) NOT NULL UNIQUE,
      department VARCHAR(100),
      email VARCHAR(120) NOT NULL UNIQUE,
      phone VARCHAR(20),
      admissionYear INT,
      course VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

// Add new student
export const addStudent = async (data) => {
  const { name, rollNo, department, email, phone, admissionYear, course } = data;

  const [result] = await pool.query(
    `INSERT INTO students (name, rollNo, department, email, phone, admissionYear, course)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, rollNo, department, email, phone, admissionYear, course]
  );

  return { id: result.insertId, ...data };
};

// Get all students
export const getAllStudents = async () => {
  const [rows] = await pool.query(`SELECT * FROM students ORDER BY id DESC`);
  return rows;
};

// Get student by ID
export const getStudentById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM students WHERE id = ?`, [id]);
  return rows[0];
};

// Update student
export const updateStudent = async (id, data) => {
  const fields = Object.keys(data)
    .map((key) => `${key}=?`)
    .join(",");

  const values = Object.values(data);

  await pool.query(
    `UPDATE students SET ${fields} WHERE id = ?`,
    [...values, id]
  );

  return { id, ...data };
};

// Delete student
export const deleteStudent = async (id) => {
  await pool.query(`DELETE FROM students WHERE id = ?`, [id]);
  return { message: "Student deleted", id };
};
