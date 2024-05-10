import { pool } from "@/app/config/db";
import { hash } from "bcrypt";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { userId, subject, html } = await request.json();

    // Fetch user details from the database based on the user's ID
    const connection = await pool.getConnection();
    const [userRows] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = userRows[0];

    if (user && user.role === 'Admin') {
     
      const transporter = nodemailer.createTransport({
      
      });

      const mailOptions = {
        from: 'your-email@example.com',
        to: user.email, 
        subject: subject,
        html: html,
      };

      await transporter.sendMail(mailOptions);

      return request.respond({
        status: 200,
        body: JSON.stringify({ message: 'Email sent successfully' }),
      });
    } else {
      return request.respond({
        status: 403,
        body: JSON.stringify({ error: 'User is not authorized to send emails' }),
      });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return request.respond({
      status: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    });
  }
}
