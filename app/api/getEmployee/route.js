
import { pool } from "@/app/config/db";
export async function GET(request) {
    try {
      const connection = await pool.getConnection();
  
     
      const [users] = await connection.query(`SELECT * FROM Users WHERE role='Employee'`);

  
      connection.release();
  
      return new Response(JSON.stringify({ users }), {
        status: 200,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return new Response(JSON.stringify({ message: "Failed to fetch users" }), {
        status: 500,
      });
    }
  }
  