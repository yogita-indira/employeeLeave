
import { pool } from "@/app/config/db";
import { compare } from "bcrypt"; 
import { setSession } from "@/app/utils/sessionUtils";
import { sign } from "jsonwebtoken";

function generateToken(user) {
  
  const payload = {
    userId: user.id,
    email: user.email,
    username:user.username,
    role:user.role,
  };

  
  const token = sign(payload, 'your-secret-key', { expiresIn: '1h' });

  
  return token;
}

export async function POST(req, res) {
  const requestBody = await req.json();
  const { email, password } = requestBody;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide an email and password' });
  }

  try {
    const connection = await pool.getConnection();
    const [userRows] = await connection.query('SELECT * FROM Users WHERE email = ?', [email]);
    connection.release();

    if (userRows.length === 0) {
      return new Response(
        JSON.stringify({ message: "user not found"}),
        {
          status: 404,
        }
      );
    }

    const user = userRows[0];
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      

      return new Response(
        JSON.stringify({ message: "Invalid email or password"}),
        {
          status: 401,
        }
      );
    }

    const token = generateToken(user); 
    
    setSession(res, token);
    return new Response(
      JSON.stringify({ message: "Login Successfull", token}),
      {
        status: 200,
      }
     
    );


  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Error in login"}),
      {
        status: 500,
      }
    );
  }
}

