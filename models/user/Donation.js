import { pool } from "../../config/db.js"; 

// Utility: Ensure Donation Table Exists (Optional)
export async function ensureDonationTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS UserDonation (
      id INT AUTO_INCREMENT PRIMARY KEY,
      donor VARCHAR(255) NOT NULL,
      amount DECIMAL(15,2) NOT NULL,
      date DATE NOT NULL,
      purpose VARCHAR(255),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
}

// Create new donation
export async function createDonation({ donor, amount, date, purpose }) {
  const [result] = await pool.query(
    "INSERT INTO UserDonation (donor, amount, date, purpose) VALUES (?, ?, ?, ?)",
    [donor, amount, date, purpose]
  );
  return { id: result.insertId, donor, amount, date, purpose };
}

// Get all donations
export async function getDonations() {
  const [rows] = await pool.query("SELECT * FROM UserDonation");
  return rows;
}

// Get donation by ID
export async function findDonationById(id) {
  const [rows] = await pool.query("SELECT * FROM UserDonation WHERE id = ?", [id]);
  return rows[0];
}

// Update donation by ID
export async function updateDonation(id, { donor, amount, date, purpose }) {
  const [result] = await pool.query(
    "UPDATE UserDonation SET donor=?, amount=?, date=?, purpose=? WHERE id=?",
    [donor, amount, date, purpose, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, donor, amount, date, purpose };
}

// Delete donation by ID
export async function deleteDonation(id) {
  const [result] = await pool.query("DELETE FROM UserDonation WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
