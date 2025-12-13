import mysql from "mysql2/promise";

// Create MySQL connection pool (Railway variables)
export const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Connect with retry (important on Railway)
export const connectDB = async (retries = 5) => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL Connected Successfully");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.code);

    if (retries === 0) {
      console.error("🚨 MySQL not reachable after retries");
      throw error;
    }

    console.log(`⏳ Retrying MySQL connection (${retries} left)...`);
    await new Promise(res => setTimeout(res, 3000));
    return connectDB(retries - 1);
  }
};
