import { Router, Request, Response } from "express";
import { getSession } from "../auth/session";
import { pool } from "../db/db";
import type { Member } from "../types/ClanMembers";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const {clan_id, search, number} = req.body;
        /*const number = Number(req.query.number);
        const search = String(req.query.search ?? "").trim();*/

        let whereSql = "";
        let params: (string | number)[] = [];

        if (search) {
            whereSql = `
        cm.clan_id = $1
        AND cm.active = TRUE
        AND (
            cm.pubg_id::text ILIKE $2
            OR cm.nickname ILIKE $2
            OR cm.name ILIKE $2
        )
    `;

            params = [clan_id, `%${search}%`];
        } else {
            whereSql = `
        cm.clan_id = $1
        AND cm.clan = $2
        AND cm.active = TRUE
    `;

            params = [clan_id, number];
        }

        const query = `
            SELECT 
                cm.id,
                cm.name,
                cm.nickname,
                cm.city,
                cm.pubg_id,
                cm.age,
                cm.created_at,
                cm.clan,
                cm.clan_id,
                cm.actor_id,
                CASE 
                    WHEN sc.leader_actor_id = cm.actor_id THEN TRUE 
                    ELSE FALSE 
                END AS "isLeader",
        
                CASE 
                    WHEN mod.actor_id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS "isModerator"
        
            FROM clan_members cm
        
            LEFT JOIN subclans sc 
                ON sc.clan_id = cm.clan_id
               AND sc.number = cm.clan
        
            LEFT JOIN clan_moderators mod 
                ON mod.actor_id = cm.actor_id
               AND mod.clan_id = cm.clan_id
        
            WHERE ${whereSql}
        
            LIMIT 100
        `;
        const result = await pool.query<Member>(query, params);
        const members = result.rows.map((member) => ({
            ...member,
            timeInClan: formatTimeInClan(member.created_at),
        }));
        return res.json({
            ok: true,
            members,
            count: members.length,
        });
    } catch (e) {
        console.log(e);
        return res.json({
            ok: false,
        });
    }
});

export function formatTimeInClan(dateString: string): string {
    const now = new Date();
    const joined = new Date(dateString);

    const diffMs = now.getTime() - joined.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "сегодня";
    if (diffDays < 30) return `${diffDays} дн.`;

    const months = Math.floor(diffDays / 30);
    if (months < 12) return `${months} мес.`;

    const years = Math.floor(months / 12);
    return `${years} г.`;
}

export default router;