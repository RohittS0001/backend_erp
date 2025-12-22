// models/immersion.js
import { pool } from "../../config/db.js";

/**
 * Ensure tables for Industry and Academic applications exist.
 */
export async function ensureImmersionTables() {
  // Industry applying to academic immersion
  await pool.query(`
    CREATE TABLE IF NOT EXISTS IndustryApplication (
      id INT AUTO_INCREMENT PRIMARY KEY,
      industryName VARCHAR(255) NOT NULL,
      industryEmail VARCHAR(255) NOT NULL,
      industrySkypeId VARCHAR(255),
      industryContact VARCHAR(50) NOT NULL,
      industryLocation VARCHAR(255) NOT NULL,
      industrySkillsSubjects TEXT NOT NULL,
      industryExperienceLookingFor VARCHAR(255) NOT NULL,
      industryDescription TEXT,
      resumePath VARCHAR(500),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Academic (university / institute) applying to industry immersion
  await pool.query(`
    CREATE TABLE IF NOT EXISTS AcademicApplication (
      id INT AUTO_INCREMENT PRIMARY KEY,
      academicName VARCHAR(255) NOT NULL,
      academicContact VARCHAR(50) NOT NULL,
      academicEmail VARCHAR(255) NOT NULL,
      academicLocation VARCHAR(255) NOT NULL,
      academicPrograms VARCHAR(255) NOT NULL,
      academicSpecialization VARCHAR(255) NOT NULL,
      academicSubject VARCHAR(255) NOT NULL,
      academicSkypeId VARCHAR(255),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

/* ---------- Industry Application CRUD ---------- */

export async function createIndustryApplication({
  industryName,
  industryEmail,
  industrySkypeId,
  industryContact,
  industryLocation,
  industrySkillsSubjects,
  industryExperienceLookingFor,
  industryDescription,
  resumePath
}) {
  const [result] = await pool.query(
    `
    INSERT INTO IndustryApplication (
      industryName,
      industryEmail,
      industrySkypeId,
      industryContact,
      industryLocation,
      industrySkillsSubjects,
      industryExperienceLookingFor,
      industryDescription,
      resumePath
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      industryName,
      industryEmail,
      industrySkypeId,
      industryContact,
      industryLocation,
      industrySkillsSubjects,
      industryExperienceLookingFor,
      industryDescription,
      resumePath || null
    ]
  );

  return {
    id: result.insertId,
    industryName,
    industryEmail,
    industrySkypeId,
    industryContact,
    industryLocation,
    industrySkillsSubjects,
    industryExperienceLookingFor,
    industryDescription,
    resumePath: resumePath || null
  };
}

export async function getIndustryApplications() {
  const [rows] = await pool.query(
    "SELECT * FROM IndustryApplication ORDER BY createdAt DESC"
  );
  return rows;
}

/* ---------- Academic Application CRUD ---------- */

export async function createAcademicApplication({
  academicName,
  academicContact,
  academicEmail,
  academicLocation,
  academicPrograms,
  academicSpecialization,
  academicSubject,
  academicSkypeId
}) {
  const [result] = await pool.query(
    `
    INSERT INTO AcademicApplication (
      academicName,
      academicContact,
      academicEmail,
      academicLocation,
      academicPrograms,
      academicSpecialization,
      academicSubject,
      academicSkypeId
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      academicName,
      academicContact,
      academicEmail,
      academicLocation,
      academicPrograms,
      academicSpecialization,
      academicSubject,
      academicSkypeId
    ]
  );

  return {
    id: result.insertId,
    academicName,
    academicContact,
    academicEmail,
    academicLocation,
    academicPrograms,
    academicSpecialization,
    academicSubject,
    academicSkypeId
  };
}

export async function getAcademicApplications() {
  const [rows] = await pool.query(
    "SELECT * FROM AcademicApplication ORDER BY createdAt DESC"
  );
  return rows;
}
