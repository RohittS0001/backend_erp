import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.MYSQLHOST,                  // Railway host
  user: process.env.MYSQLUSER,                  // Railway user
  password: process.env.MYSQLPASSWORD,          // Railway password
  database: process.env.MYSQL_DATABASE,         // Railway database
  port: Number(process.env.MYSQLPORT),          // Railway port
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
