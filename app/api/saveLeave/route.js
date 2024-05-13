// pages/api/create-leave-entry.js

import { pool } from '@/app/config/db';

export default async function POST(req) {
    try {
        const connection = await pool.getConnection();
        const requestBody = await req.json(); // Corrected from 'request.json()'

        const { userId, fromDate, toDate, leaveType, status, reason } = requestBody;

        const [result] = await connection.execute(
            'INSERT INTO leaveTable (userId, start_date, end_date, leave_type, status, reason) VALUES (?, ?, ?, ?, ?, ?)', // Added placeholders for status and reason
            [userId, fromDate, toDate, leaveType, status, reason]
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
