import { pool } from "../../config/db.js";

// AUTO-CREATE Attendance TABLE
export async function ensureAttendanceTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Attendance (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentName VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'Student',
      date DATE NOT NULL,
      status ENUM('Present', 'Absent', 'Late', 'Leave') NOT NULL
    );
  `);
}

// Get all attendance records
export async function getAllAttendance() {
  const [rows] = await pool.query(`SELECT * FROM Attendance ORDER BY id DESC`);
  return rows;
}

// Create attendance record
export async function createAttendance(data) {
  const { studentName, role = "Student", date, status } = data;

  const [result] = await pool.query(
    `INSERT INTO Attendance (studentName, role, date, status) VALUES (?, ?, ?, ?)`,
    [studentName, role, date, status]
  );

  return { id: result.insertId, studentName, role, date, status };
}

// Update attendance record
export async function updateAttendanceById(id, data) {
  const { studentName, role, date, status } = data;

  const [result] = await pool.query(
    `UPDATE Attendance SET studentName=?, role=?, date=?, status=? WHERE id=?`,
    [studentName, role, date, status, id]
  );

  return result.affectedRows > 0
    ? { id, studentName, role, date, status }
    : null;
}

// Delete attendance record
export async function deleteAttendanceById(id) {
  const [result] = await pool.query(`DELETE FROM Attendance WHERE id=?`, [id]);
  return result.affectedRows > 0;
}
