
// userApi.js
import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";
import createTable from "@/app/config/createTable";

export async function GET(request) {
  try {
   

    const connection = await pool.getConnection();
    if(connection){
        createTable();
    }
   
    const [users] = await connection.query("show tables");
    connection.release();

    const data = JSON.stringify(users);
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    // Handle errors
    console.error("Error executing query:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
  
  
    const connection = await pool.getConnection();
    if(connection){
        createTable();
    }
    const requestBody = await request.json();

    // Extract the necessary fields from the parsed JSON body
    const { username, email, password, role } = requestBody;
    console.log(username, "user")
  
    const result = await connection.query('INSERT INTO Emp (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role]);
  
    connection.release();
  
    return new Response(JSON.stringify({ message: 'User created successfully', data: result }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}