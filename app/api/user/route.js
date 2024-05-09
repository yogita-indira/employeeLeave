
// userApi.js
import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";
import createTable from "@/app/config/createTable";

// export async function GET(request) {
//   try {
   

//     const connection = await pool.getConnection();
//     if(connection){
//         createTable();
//     }
   
//     const [users] = await connection.query("show tables");
//     connection.release();

//     const data = JSON.stringify(users);
//     return new Response(data, {
//       status: 200,
//     });
//   } catch (error) {
//     // Handle errors
//     console.error("Error executing query:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
export async function POST(request) {
  
    try {
      const connection = await pool.getConnection();
      if (connection) {
        createTable();
      }
      const requestBody = await request.json();
  
      // Extract the necessary fields from the parsed JSON body
      const { username, email, password, role } = requestBody;
    
      // Check if the email already exists in the database
      const existingUser = await connection.query('SELECT * FROM Users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        connection.release();
        return new Response(JSON.stringify({ message: 'Email already exists' }), { status: 400 });
      }
  
      // If the email is unique, proceed with inserting the new user
      const result = await connection.query('INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role]);
    
      connection.release();
    
      return new Response(JSON.stringify({ message: 'User created successfully', data: result }), {
        status: 201,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response(JSON.stringify({ message: 'Failed to create user' }), { status: 500 });
    }
  }
  




  export async function POST(req, res) {
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
      const user = await Users.findByEmail(email);
      // Check if user exists and password is correct
      if (!user || !(await compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
     
    
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error in Login...' });
    }
  }
  