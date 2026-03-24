import crypto from "crypto";
import {pool} from "../db/db";

type SessionUser = {
  id: number;
  pubg_id: string;
  nickname?: string;
  actor_id?: string;
};

const SESSION_DAYS = 30;

const sessions = new Map<string, SessionUser>();

export async function createSession(user_id){
    const token = crypto.randomUUID();
    try{
        const query =`INSERT INTO sessions (id, user_id, expires_at)
        VALUES($1,$2, NOW() + INTERVAL '30 days')
        RETURNING id`;

        const result = await pool.query(query,[token, user_id]);
        return result.rows[0].id;
    }
    catch (e){
        console.error(e);
        return null;
    }
}

export async function getSession(token: string){
    const query = `SELECT cm.id, cm.pubg_id, cm.nickname, cm.actor_id, cm.clan_id
        FROM sessions s
        JOIN clan_members cm ON s.user_id = cm.id
        WHERE s.id = $1`;
    try{
        const  result = await pool.query(query,[token]);
        if(result?.rows.length > 0){
            const user = result.rows[0];
            return {
                id: user.id,
                pubg_id: user.pubg_id,
                nickname: user.nickname,
                actor_id: user.actor_id,
                clan_id: user.clan_id,
            }
        }
        return  null;
    }
    catch (e){
        console.error(e);
        return null;
    }
}

export async function deleteSession(token: string){
    const query = "DELETE FROM sessions WHERE id = $1";
    await pool.query(query,[token]);
}