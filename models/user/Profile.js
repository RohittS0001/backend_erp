import { pool } from "../../config/db.js"; // Adjust path as needed

// Utility: Ensure Profile Table Exists (Optional)
export async function ensureProfileTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UserProfile (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      membershipStatus VARCHAR(50) DEFAULT 'Active',
      skills TEXT,
      phone VARCHAR(50),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

// Create new profile
export async function createProfile({ userId, name, email, membershipStatus, skills, phone }) {
  // skills is an array, so store as JSON string
  const skillsStr = skills ? JSON.stringify(skills) : "[]";
  const [result] = await pool.query(
    "INSERT INTO UserProfile (userId, name, email, membershipStatus, skills, phone) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, name, email, membershipStatus || 'Active', skillsStr, phone || ""]
  );
  return { id: result.insertId, userId, name, email, membershipStatus: membershipStatus || 'Active', skills, phone };
}

// GET all profiles with user info
export async function getProfilesWithUser() {
  const [rows] = await pool.query(`
    SELECT p.*, u.name as userName, u.email as userEmail
    FROM UserProfile p
    JOIN User u ON p.userId = u.id
  `);
  // Parse skills for each profile
  return rows.map(r => ({
    ...r,
    skills: JSON.parse(r.skills || "[]"),
    contact: { email: r.email, phone: r.phone }
  }));
}

// Get all profiles (simple)
export async function getProfiles() {
  const [rows] = await pool.query("SELECT * FROM UserProfile");
  return rows.map(r => ({
    ...r,
    skills: JSON.parse(r.skills || "[]"),
    contact: { email: r.email, phone: r.phone }
  }));
}

// Get profile by ID with user details
export async function findProfileByIdWithUser(id) {
  const [rows] = await pool.query(`
    SELECT p.*, u.name as userName, u.email as userEmail
    FROM UserProfile p
    JOIN User u ON p.userId = u.id
    WHERE p.id = ?
  `, [id]);
  if (!rows[0]) return null;
  const r = rows[0];
  r.skills = JSON.parse(r.skills || "[]");
  r.contact = { email: r.email, phone: r.phone };
  return r;
}

// Get profile by ID (basic)
export async function findProfileById(id) {
  const [rows] = await pool.query("SELECT * FROM UserProfile WHERE id = ?", [id]);
  if (!rows[0]) return null;
  const r = rows[0];
  r.skills = JSON.parse(r.skills || "[]");
  r.contact = { email: r.email, phone: r.phone };
  return r;
}

// Update profile by ID
export async function updateProfile(id, { userId, name, email, membershipStatus, skills, phone }) {
  const skillsStr = skills ? JSON.stringify(skills) : "[]";
  const [result] = await pool.query(
    "UPDATE UserProfile SET userId=?, name=?, email=?, membershipStatus=?, skills=?, phone=? WHERE id=?",
    [userId, name, email, membershipStatus || 'Active', skillsStr, phone || "", id]
  );
  if (result.affectedRows === 0) return null;
  return { id, userId, name, email, membershipStatus: membershipStatus || 'Active', skills, phone };
}

// Delete profile by ID
export async function deleteProfile(id) {
  const [result] = await pool.query("DELETE FROM UserProfile WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
