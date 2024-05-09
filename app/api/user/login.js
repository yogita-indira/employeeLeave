import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";

// Function to handle user login
export async function loginUser(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    const { email, password } = req.body;
    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password' });
    }
    // Retrieve user from the database
    try {
      const connection = await pool.getConnection();
      const [userRows] = await connection.query('SELECT * FROM Users WHERE email = ?', [email]);
      connection.release();
  
      if (userRows.length === 0) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      const user = userRows[0]; // Assuming there's only one user per email
  
      // Check if password matches
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // If email and password match, authentication is successful
      // You can generate a JWT token here and send it back as a response for further authentication
      // For demonstration, let's just send a success message
      return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error in Login...' });
    }
  }
  