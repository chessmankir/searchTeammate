import { Pool} from "pg";
import {errorMonitor} from "node:events";
import dotenv from "dotenv";
dotenv.config();


console.log("process.env.SUPABASE_DATABASE_URL");
console.log(process.env.SUPABASE_DATABASE_URL);
export const pool = new Pool({
     connectionString: process.env.SUPABASE_DATABASE_URL,
    ssl: {
         rejectUnauthorized: false
    }
});

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