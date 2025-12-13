import { pool } from "../../config/db.js"; // Adjust path as needed

// Utility: Ensure Membership Table Exists (Optional)
export async function ensureMembershipTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UserMembership (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      organization VARCHAR(255) NOT NULL,
      membershipType VARCHAR(100) NOT NULL,
      startDate DATE NOT NULL,
      endDate DATE,
      status VARCHAR(50) DEFAULT 'active',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

// Create new membership record
export async function createMembership({ userId, organization, membershipType, startDate, endDate, status }) {
  const [result] = await pool.query(
    "INSERT INTO UserMembership (userId, organization, membershipType, startDate, endDate, status) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, organization, membershipType, startDate, endDate, status || 'active']
  );
  return { id: result.insertId, userId, organization, membershipType, startDate, endDate, status: status || 'active' };
}

// Get all membership records
export async function getMemberships() {
  const [rows] = await pool.query("SELECT * FROM UserMembership");
  return rows;
}

// Get membership by ID
export async function findMembershipById(id) {
  const [rows] = await pool.query("SELECT * FROM UserMembership WHERE id = ?", [id]);
  return rows[0];
}

// Update membership by ID
export async function updateMembership(id, { userId, organization, membershipType, startDate, endDate, status }) {
  const [result] = await pool.query(
    "UPDATE UserMembership SET userId=?, organization=?, membershipType=?, startDate=?, endDate=?, status=? WHERE id=?",
    [userId, organization, membershipType, startDate, endDate, status || 'active', id]
  );
  if (result.affectedRows === 0) return null;
  return { id, userId, organization, membershipType, startDate, endDate, status: status || 'active' };
}

// Delete membership by ID
export async function deleteMembership(id) {
  const [result] = await pool.query("DELETE FROM UserMembership WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
