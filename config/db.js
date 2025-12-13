import mysql from "mysql2/promise";

// Create MySQL connection pool (Railway-safe)
export const pool = mysql.createPool({
  host: process.env.MYSQLHOST,          // ✅ railway internal host
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),  // ✅ MUST be 3306
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false }    // ✅ required on Railway
});

// Connect with retry (Railway cold-start safe)
export const connectDB = async (retries = 10) => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL Connected Successfully");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.code || error.message);

    if (retries === 0) {
      console.error("🚨 MySQL not reachable after retries");
      throw error;
    }

    console.log(`⏳ Retrying MySQL connection (${retries} left)...`);
    await new Promise(res => setTimeout(res, 3000));
    return connectDB(retries - 1);
  }
};
