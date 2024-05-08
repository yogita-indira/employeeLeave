// db.js
import mysql from "mysql2/promise";

// Create and export a connection pool
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Indira@123",
  database: "employee"
});
