import { Router, Request, Response } from "express";
import { getSession } from "../auth/session";
import { pool } from "../db/db";
import type { Member } from "../../types/ClanMembers";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const sid = req.cookies?.sid;

    try {
        const user = await getSession(sid);

        if (!user?.id) {
            return res.json({ ok: false });
        }

        const number = Number(req.query.number);
        const search = String(req.query.search ?? "").trim();

        let query = "";
        let params: (string | number)[] = [];

        // Если есть поиск — ищем по всем подкланам внутри clan_id
        if (search) {
            query = `
                SELECT id, name, nickname, city, pubg_id, age, created_at
                FROM clan_members
                WHERE clan_id = $1
                  AND active = TRUE
                  AND (
                    pubg_id::text ILIKE $2
                    OR nickname ILIKE $2
                    OR name ILIKE $2
                  )
                LIMIT 100
            `;

            params = [user.clan_id, `%${search}%`];
        } else {
            // Если поиска нет — ищем только по выбранному номеру подклана
            query = `
                SELECT id, name, nickname, city, pubg_id, age, created_at
                FROM clan_members
                WHERE clan_id = $1
                  AND clan = $2
                  AND active = TRUE
                LIMIT 100
            `;

            params = [user.clan_id, number];
        }
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