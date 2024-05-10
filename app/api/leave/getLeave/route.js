import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
export async function POST(request) {
  try {
    const connection = await pool.getConnection();

    const requestBody = await request.json();

    const { username, email, password, role } = requestBody;
    console.log(username);

    const [existingUser] = await connection.query('SELECT * FROM LeaveTable WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        connection.release();
        return new Response(JSON.stringify({ message: 'Email already exists' }), {
            status: 400,
        });
    }
  }catch(err){

  }
}