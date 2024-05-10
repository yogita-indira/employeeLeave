// Add this code to your server-side API
import { pool } from "@/app/config/db";
export async function POST(request) {
    try {
      const connection = await pool.getConnection();
  
      // Fetch all users from the database
      const [users] = await connection.query(`SELECT * FROM Users WHERE id=[userId] and role==Employee`);

  
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
  