import { pool } from "@/app/config/db";
export async function POST(request) {
  try {
    const connection = await pool.getConnection();
    const requestBody = await request.json();
    const { email } = requestBody;

     const [userResult] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
    if (userResult.length === 0) {
      connection.release();
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    const userId = userResult[0].id;
    console.log(userId)

       const [leaves] = await connection.query('SELECT * FROM leavestable WHERE user_id =?', [userId]);
    connection.release();
console.log(JSON.stringify(leaves))
    return new Response(JSON.stringify(leaves), {
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching leaves:", err);
    return new Response(JSON.stringify({ message: 'Error fetching leaves' }), {
      status: 500,
    });
  }
}
