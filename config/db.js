import mysql from "mysql2/promise";

// ---------------------- MYSQL POOL ----------------------
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,      // safe for Railway
  queueLimit: 0,
  connectTimeout: 10000,    // 10 seconds
});

// ---------------------- TEST CONNECTION -----------------
export const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();

    console.log("✅ MySQL Connected Successfully");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.message);

    // ❗ DO NOT exit process on Railway
    // process.exit(1);
  }
};
