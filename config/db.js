import mysql from "mysql2/promise";

const {
  MYSQLHOST,
  MYSQLPORT,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQLDATABASE,
} = process.env;

// Safety check
if (!MYSQLHOST || !MYSQLPORT || !MYSQLUSER || !MYSQLPASSWORD || !MYSQLDATABASE) {
  throw new Error("❌ MySQL environment variables are not properly set!");
}

// Create pool
export const pool = mysql.createPool({
  host: MYSQLHOST,
  port: Number(MYSQLPORT),
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
  database: MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
export const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL Connected Successfully");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.message);
    throw error;
  }
};
