import 'server-only'
import { connectToDatabase } from "@/lib/db";
import { delay } from '@/lib/utils';

export const getAssets = (async (id: string, per_page?: string, page?: string) => {

    const { pool } = connectToDatabase();

    if (!per_page || !page) {
        return []
    }

    try {
        // const client = await pool.connect();

        const query = {
            text: 'SELECT * FROM assets OFFSET $1 LIMIT $2',
            values: [Number(per_page) * (Number(page) - 1), Number(per_page)]
        };
        const assets = (await pool.query(query)).rows;
        // client.release();

        return assets;


    } catch (e) {
        console.error(e);
    }
})


export const getAssetCount = (async (id: string) => {

    const { pool } = connectToDatabase();
    try {
        // const client = await pool.connect();
        const query = {
            text: 'SELECT COUNT(*) FROM assets',
        };
        const assetCount = (await pool.query(query)).rows[0];
        // client.release();

        return assetCount.count;


    } catch (e) {
        console.error(e);
    }
})