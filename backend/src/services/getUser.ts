import {User} from "node-telegram-bot-api";
import {pool} from "../db/db";

export async function getUserByPubId(pubId: number){
    const sql = `SELECT * FROM clan_members WHERE pubg_id=$1`;
    try{
        const response = await pool.query(sql,[pubId]);
        console.log(response.rows);
        if(response.rows.length > 0) return response.rows[0];
        return null;
    }
    catch (error){
        console.error(error);
        return null;
    }
}