import { Pool} from "pg";
import {errorMonitor} from "node:events";
import dotenv from "dotenv";
dotenv.config();
export const pool = new Pool({
    connectionString: process.env.SUPABASE_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    // помогает избежать неожиданных разрывов
    keepAlive: true,
});

/*
export const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "kir",
    database: "checkmate2",
});
*/


/*
export const pool = new Pool({
    host: "orgasedooysog.beget.app",
    port: 5432,
    user: "cloud_user",
    password: "w*sVwHf6Yn%*",
    database: "checkmate",
});
*/

(async () => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT NOW()");
        console.log("✅ DB connected:", result.rows[0]);
        client.release();
    } catch (err) {
        console.error("❌ DB connection failed:", err);
    }
})();

pool.on("error", (err) => {
    console.error("pg pool is error", err);
})