import { Router, Request, Response } from "express";
import { getSession } from "../auth/session";
import { pool } from "../db/db";
import type { Member } from "../types/ClanMembers";
import {formatTimeInClan} from "../libs/dateFormat";

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


export default router;