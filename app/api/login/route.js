import { pool } from "@/app/config/db";
import { compare } from "bcrypt"; // Assuming you're using bcrypt for password hashing

export async function POST(req) {
  const requestBody = await req.json();
  const { email, password } = requestBody;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Please provide an email and password' }));
  }

  try {
    const connection = await pool.getConnection();
    const [userRows] = await connection.query('SELECT * FROM Users WHERE email = ?', [email]);
    connection.release();

    if (userRows.length === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }));
    }

    const user = userRows[0];
    console.log("Password from request:", password);
    console.log("Hashed password from database:", user.password);
    const passwordMatch = await compare(password, user.password);
    console.log("Password match result:", passwordMatch);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }));
    }

    return new Response(JSON.stringify({ message: 'Login successful' }));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Error in Login...' }));
  }
}
