import { Pool } from "pg";

if (!global.db) {
    global.db = { pool: null };
}

export function connectToDatabase() {
    if (!global.db.pool) {
        console.log("No pool available, creating new pool.");
        global.db.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: parseInt(process.env.DB_PORT + ""),
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
    return global.db;
}
