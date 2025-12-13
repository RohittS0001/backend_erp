import { pool } from "../../config/db.js";

// AUTO-CREATE events TABLE
export async function ensureEventTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      venue VARCHAR(255)
    );
  `);
}

// GET all events
export async function getEvents() {
  const [rows] = await pool.query("SELECT * FROM events ORDER BY id DESC");
  return rows;
}

// ADD event
export async function addEvent(data) {
  const { title, description, date, venue } = data;

  const [result] = await pool.query(
    "INSERT INTO events (title, description, date, venue) VALUES (?, ?, ?, ?)",
    [title, description, date, venue]
  );

  return {
    id: result.insertId,
    title,
    description,
    date,
    venue
  };
}

// UPDATE event
export async function updateEvent(id, data) {
  const { title, description, date, venue } = data;

  await pool.query(
    "UPDATE events SET title=?, description=?, date=?, venue=? WHERE id=?",
    [title, description, date, venue, id]
  );

  return {
    id,
    title,
    description,
    date,
    venue
  };
}

// DELETE event
export async function deleteEvent(id) {
  const [result] = await pool.query("DELETE FROM events WHERE id=?", [id]);
  return result.affectedRows > 0;
}

// COUNT events (for dashboard)
export async function countEvents() {
  const [rows] = await pool.query("SELECT COUNT(*) AS total FROM events");
  return rows[0].total;
}
