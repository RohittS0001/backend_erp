import { pool } from "../../config/db.js";

// ADDED: Auto-create AdminNotifications table if it doesn't exist
export async function ensureNotificationTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS AdminNotifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      message TEXT,
      date DATETIME,
      recipient VARCHAR(255),
      status VARCHAR(20) DEFAULT 'Active'
    );
  `);
}

// Get all notifications
export async function getAllNotifications() {
  const [rows] = await pool.query('SELECT * FROM AdminNotifications');
  return rows;
}

// Create a new notification
export async function createNotification(data) {
  const { title, message, date = new Date(), recipient, status = "Active" } = data;
  const [result] = await pool.query(
    'INSERT INTO AdminNotifications (title, message, date, recipient, status) VALUES (?, ?, ?, ?, ?)',
    [title, message, date, recipient, status]
  );
  return { id: result.insertId, title, message, date, recipient, status };
}

// Update a notification by ID
export async function updateNotificationById(id, data) {
  const { title, message, date, recipient, status } = data;
  const [result] = await pool.query(
    'UPDATE AdminNotifications SET title=?, message=?, date=?, recipient=?, status=? WHERE id=?',
    [title, message, date, recipient, status, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, title, message, date, recipient, status };
}

// Delete a notification by ID
export async function deleteNotificationById(id) {
  const [result] = await pool.query('DELETE FROM AdminNotifications WHERE id=?', [id]);
  return result.affectedRows > 0;
}

// (Optional) Get count of active notifications
export async function getActiveNotificationCount() {
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM AdminNotifications WHERE status="Active"');
  return rows[0].count;
}
