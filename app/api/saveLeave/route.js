// pages/api/create-leave-entry.js

import { pool } from '@/app/config/db';

export default async function POST(req) {

    try {

        const connection = await pool.getConnection();

        const requestBody = await request.json();
    
      const { decodedToken, fromDate, toDate, leaveType, reason } = requestBody;

      // Extract user ID from the decoded token
      const userId = decodedToken.userId;

      // Insert leave entry into the database
   
      const [result] = await connection.execute(
        'INSERT INTO leaveTable (userId, fromDate, toDate, leave_type, reason) VALUES (?, ?, ?, ?, ?)',
        [userId, fromDate, toDate, leaveType, reason]
      );
      connection.release();

      return new Response(
        JSON.stringify({ message: "Leave entry created successfully"}),
        {
          status: 200,
        }
    );
    } catch (error) {
      console.error('Error creating leave entry:', error);
      return new Response(
        JSON.stringify({ message: "Failed to create Leave entry"}),
        {
          status: 500,
        }
      );
    }
  } 
