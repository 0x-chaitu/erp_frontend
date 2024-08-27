import { connectToDatabase } from "@/lib/db";

export const getTenant = (async (id: string) => {

    const { pool } = connectToDatabase();

    if (!pool) {
        return []
    }
    try {
        // const client = await pool.connect();
        const query = {
            text: 'SELECT * FROM organizations WHERE subdomain = $1 LIMIT 1',
            values: [id],
        };
        const tenantId = (await pool.query(query)).rows[0];
        // client.release();
        return tenantId;


    } catch (e) {
        console.error(e);
    }
})