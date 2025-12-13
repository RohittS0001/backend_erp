import { pool } from "../../config/db.js";

// ADDED: Auto-create AdminSettings table if it doesn't exist
export async function ensureSettingTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS AdminSettings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      systemName VARCHAR(255),
      logoUrl VARCHAR(255),
      theme VARCHAR(50) DEFAULT 'light',
      language VARCHAR(20) DEFAULT 'en',
      passwordExpiryDays INT DEFAULT 90,
      twoFactorAuth BOOLEAN DEFAULT FALSE,
      allowedLoginIPs TEXT,
      integrationEmail VARCHAR(255),
      integrationSMS BOOLEAN DEFAULT TRUE,
      enableAPIAccess BOOLEAN DEFAULT FALSE,
      apiKey VARCHAR(255),
      notificationFrequency VARCHAR(50) DEFAULT 'daily',
      backupEnabled BOOLEAN DEFAULT TRUE,
      backupSchedule VARCHAR(50) DEFAULT 'weekly',
      auditLogging BOOLEAN DEFAULT TRUE
    );
  `);
}

// Get all settings (assuming single settings document)
export async function getSettings() {
  const [rows] = await pool.query('SELECT * FROM AdminSettings LIMIT 1');
  return rows[0] || null;
}

// Create or update settings (upsert logic)
export async function upsertSettings(data) {
  const {
    systemName,
    logoUrl,
    theme = "light",
    language = "en",
    passwordExpiryDays = 90,
    twoFactorAuth = false,
    allowedLoginIPs,
    integrationEmail,
    integrationSMS = true,
    enableAPIAccess = false,
    apiKey,
    notificationFrequency = "daily",
    backupEnabled = true,
    backupSchedule = "weekly",
    auditLogging = true,
  } = data;

  // Check if settings exist
  const existing = await getSettings();
  if (existing) {
    const [result] = await pool.query(
      `UPDATE AdminSettings SET
        systemName=?,
        logoUrl=?,
        theme=?,
        language=?,
        passwordExpiryDays=?,
        twoFactorAuth=?,
        allowedLoginIPs=?,
        integrationEmail=?,
        integrationSMS=?,
        enableAPIAccess=?,
        apiKey=?,
        notificationFrequency=?,
        backupEnabled=?,
        backupSchedule=?,
        auditLogging=?
      WHERE id=?`,
      [
        systemName,
        logoUrl,
        theme,
        language,
        passwordExpiryDays,
        twoFactorAuth,
        allowedLoginIPs,
        integrationEmail,
        integrationSMS,
        enableAPIAccess,
        apiKey,
        notificationFrequency,
        backupEnabled,
        backupSchedule,
        auditLogging,
        existing.id,
      ]
    );
    return { id: existing.id, ...data };
  } else {
    // Insert new row
    const [result] = await pool.query(
      `INSERT INTO AdminSettings (
        systemName,
        logoUrl,
        theme,
        language,
        passwordExpiryDays,
        twoFactorAuth,
        allowedLoginIPs,
        integrationEmail,
        integrationSMS,
        enableAPIAccess,
        apiKey,
        notificationFrequency,
        backupEnabled,
        backupSchedule,
        auditLogging
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        systemName,
        logoUrl,
        theme,
        language,
        passwordExpiryDays,
        twoFactorAuth,
        allowedLoginIPs,
        integrationEmail,
        integrationSMS,
        enableAPIAccess,
        apiKey,
        notificationFrequency,
        backupEnabled,
        backupSchedule,
        auditLogging,
      ]
    );
    return { id: result.insertId, ...data };
  }
}
