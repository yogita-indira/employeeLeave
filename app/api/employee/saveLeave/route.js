// pages/api/create-leave-entry.js

import { pool } from '@/app/config/db';

export async function POST(req) {
    try {
        const connection = await pool.getConnection();
        const requestBody = await req.json(); // Corrected from 'request.json()'

        console.log('Request Body:', requestBody); // Log the request body

        const { userId, start_date, end_date, leave_type,status, reason } = requestBody;

        // Validate if userId and other required fields are present
        if (!userId || !start_date || !end_date || !leave_type || !reason) {
            throw new Error('Required fields are missing in the request body');
        }

        // Check if userId is a valid integer
        if (typeof userId !== 'number') {
            throw new Error('userId must be an integer');
        }

        // Check if start_date and end_date are valid date strings
        if (!isValidDateString(start_date) || !isValidDateString(end_date)) {
            throw new Error('start_date and end_date must be valid date strings in the format YYYY-MM-DD');
        }

        // Check if leave_type is one of the predefined enum values
        if (!['sick', 'annual'].includes(leave_type)) {
            throw new Error('leave_type must be one of the predefined values (sick or annual)');
        }

        // Perform database insertion
        const [result] = await connection.execute(
          'INSERT INTO leavestable (user_id, start_date, end_date, leave_type, reason) VALUES (?, ?, ?, ?, ?)',
          [userId, start_date, end_date, leave_type.substring(0, 10), reason]
      );
      
        connection.release();

        return new Response(
            JSON.stringify({ message: "Leave entry created successfully" }),
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error('Error creating leave entry:', error);
        return new Response(
            JSON.stringify({ message: "Failed to create Leave entry" }),
            {
                status: 500,
            }
        );
    }
}

// Function to check if a string is a valid date in the format YYYY-MM-DD
function isValidDateString(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(dateString);
}
