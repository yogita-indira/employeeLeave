import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
export async function POST(request) {
  try {
    const connection = await pool.getConnection();

    const requestBody = await request.json();

    const { username, email, password, role } = requestBody;
    console.log(username);

    const [existingUser] = await connection.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        connection.release();
        return new Response(JSON.stringify({ message: 'Email already exists' }), {
            status: 400,
        });
    }

    const hashedPassword = await hash(password, 10); // Using 10 salt rounds

    // Insert the user into the database
    const result = await connection.query(
      "INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );

    // const result = await connection.query(
    //   "INSERT INTO Users (username, email, password, role) VALUES (?, ?, ?, ?)",
    //   [username, email, password, role]
    // );

    connection.release();

    return new Response(
      JSON.stringify({ message: "User created successfully", data: result }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    if(error.message)
    return new Response(JSON.stringify({ message: "Failed to create user" }), {
      status: 500,
    });
  }
}
