import mysql from "mysql2/promise";

// ---------------------- MySQL Pool ----------------------
export const pool = mysql.createPool({
  host: process.env.MYSQLHOST,          // Railway MySQL host
  user: process.env.MYSQLUSER,          // Railway MySQL user
  password: process.env.MYSQLPASSWORD,  // Railway MySQL password
  database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE, // DB name
  port: Number(process.env.MYSQLPORT),  // Railway MySQL port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ---------------------- Connect ----------------------
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
