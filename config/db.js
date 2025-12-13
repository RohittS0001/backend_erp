import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.MYSQLHOST,             // Railway MySQL host
  user: process.env.MYSQLUSER,             // Railway MySQL user
  password: process.env.MYSQLPASSWORD,     // Railway MySQL password
  database: process.env.MYSQL_DATABASE,    // Railway MySQL database
  port: Number(process.env.MYSQLPORT),     // Railway MySQL port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();    // check connection
    conn.release();
    console.log("✅ MySQL Connected Successfully");
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error.message);
    throw error;
  }
};
