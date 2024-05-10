// db.js
import mysql from "mysql2/promise";
require('dotenv').config();

// Create and export a connection pool
export const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
