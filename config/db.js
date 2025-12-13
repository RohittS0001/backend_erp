import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,   // ✅ Railway official way
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

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
