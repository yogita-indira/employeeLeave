import { pool } from "@/app/config/db";
import { hash } from "bcrypt";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const {sendersEmail, subject,  emailContent } = await request.json();
      const connection = await pool.getConnection();
    const [userRows] = await connection.query(`SELECT * FROM users WHERE role='Admin'`);
    console.log(userRows)
    connection.release();


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
          user: "yogitabhargava1@gmail.com",
          pass: "uskj bopu rdzw hbsz",
      },
  });


    for (const user of userRows) {
      const mailOptions = {
        from: sendersEmail,
        to: user.email,
        subject: subject,
        emailContent:emailContent
       
      };

      await transporter.sendMail(mailOptions);
    }

    return new Response({
      status: 200,
      body: JSON.stringify({ message: 'Emails sent successfully' }),
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return new Response({
      status: 500,
      body: JSON.stringify({ error: 'Failed to send emails' }),
    });
  }
}
