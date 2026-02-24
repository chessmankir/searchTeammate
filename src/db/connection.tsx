// db.js
import {Pool} from "pg";
import dotenv from "dotenv"

dotenv.config();

const connectionString = process.env.SUPABASE_DATABASE_URL;
if (!connectionString){
    throw new Error("Supabase url is not defined");
}

export const pool = new Pool({
   connectionString,
    ssl: {
       rejectUnauthorized: false
    }
});