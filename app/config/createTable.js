import { pool } from "@/app/config/db";

async function createTables() {
    try {


        // Define table creation queries with IF NOT EXISTS clause
        const tableQueries = [
            `CREATE TABLE IF NOT EXISTS Emp (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('Employee', 'Admin') NOT NULL
            )`,
            `CREATE TABLE IF NOT EXISTS LeaveTable (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                leaveType,
                status ENUM('Pending', 'Approved', 'Rejected') NOT NULL,
                reason VARCHAR(255),
                FOREIGN KEY (user_id) REFERENCES User(id)
            )`,
            `CREATE TABLE IF NOT EXISTS Admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES User(id)
            )`
        ];

        // Execute table creation queries
        for (const query of tableQueries) {
            await connection.query(query);
           
        }

        // Release connection back to the pool
        await connection.release();
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}

// Call the function to create tables
export default createTables;

