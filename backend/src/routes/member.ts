import { Router, Request, Response } from "express";
import { pool } from "../db/db";
import { getSession } from "../auth/session";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const clan_id = req.query.clan_id ? Number(req.query.clan_id) : undefined;
        const number = req.query.number ? Number(req.query.number) : undefined;
        const pubg_id = req.query.pubg_id ? Number(req.query.pubg_id) : undefined;

        const limitRaw = req.query.limit ? Number(req.query.limit) : 30;
        const pageRaw = req.query.page ? Number(req.query.page) : 1;

        const ageFrom = req.query.ageFrom ? Number(req.query.ageFrom) : undefined;
        const ageTo = req.query.ageTo ? Number(req.query.ageTo) : undefined;

        const modesRaw = typeof req.query.modes === "string" ? req.query.modes : "";
        const timeRaw = typeof req.query.timemode === "string" ? req.query.timemode : "";
        const statusGame = typeof req.query.status === "string" ? req.query.status : "";

        const modes =
            modesRaw.trim().length > 0
                ? modesRaw.split(",").map((s) => s.trim()).filter(Boolean)
                : [];

        const timeModes =
            timeRaw.trim().length > 0
                ? timeRaw.split(",").map((s) => s.trim()).filter(Boolean)
                : [];

        const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 30;
        const page = Number.isFinite(pageRaw) ? Math.max(1, pageRaw) : 1;
        const offset = (page - 1) * limit;

        const where: string[] = [];
        const params: any[] = [];

        if (pubg_id !== undefined) {
            if (pubg_id === 1) {
                const sid = req.cookies?.sid;
                const user = await getSession(sid);

                if (!user?.pubg_id) {
                    return res.status(401).json({ ok: false, error: "user not found" });
                }

                params.push(user.pubg_id);
            } else {
                params.push(pubg_id);
            }

            where.push(`cm.pubg_id = $${params.length}`);
        }

        if (clan_id !== undefined && Number.isFinite(clan_id)) {
            params.push(clan_id);
            where.push(`cm.clan_id = $${params.length}`);
        }

        console.log(statusGame);
        if(statusGame !== undefined && statusGame !== "") {
            console.log("statusGame");
            params.push(statusGame);
            where.push(`cm.status_game = $${params.length}`);
        }

        if (number !== undefined && Number.isFinite(number)) {
            params.push(number);
            where.push(`cm.number = $${params.length}`);
        }

        if (ageFrom !== undefined && Number.isFinite(ageFrom)) {
            params.push(ageFrom);
            where.push(`cm.age >= $${params.length}`);
        }

        if (ageTo !== undefined && Number.isFinite(ageTo)) {
            params.push(ageTo);
            where.push(`cm.age <= $${params.length}`);
        }

        if (modes.length > 0) {
            params.push(modes);
            where.push(`
                EXISTS (
                    SELECT 1
                    FROM member_modes mm
                    JOIN game_modes gm ON gm.id = mm.mode_id
                    WHERE mm.member_id = cm.id
                      AND gm.name = ANY($${params.length}::text[])
                )
            `);
        }

        if (timeModes.length > 0) {
            params.push(timeModes);
            where.push(`
                EXISTS (
                    SELECT 1
                    FROM member_time_slots mts
                    JOIN time_slots ts ON ts.id = mts.time_slot_id
                    WHERE mts.member_id = cm.id
                      AND ts.name = ANY($${params.length}::text[])
                )
            `);
        }
        console.log(params);
        const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

        const sqlTotal = `
            SELECT COUNT(*) AS total
            FROM clan_members cm
            ${whereSql}
        `;
        console.log(sqlTotal);

        const resultTotal = await pool.query(sqlTotal, params);
        const total = Number(resultTotal.rows[0]?.total ?? 0);

        const paramsData = [...params, limit, offset];

        const sql = `
            SELECT
                cm.*,

                COALESCE((
                    SELECT ARRAY_AGG(gm.name ORDER BY gm.name)
                    FROM member_modes mm
                    JOIN game_modes gm ON gm.id = mm.mode_id
                    WHERE mm.member_id = cm.id
                ), '{}') AS modes,

                COALESCE((
                    SELECT ARRAY_AGG(ts.name ORDER BY ts.name)
                    FROM member_time_slots mts
                    JOIN time_slots ts ON ts.id = mts.time_slot_id
                    WHERE mts.member_id = cm.id
                ), '{}') AS time_modes

            FROM clan_members cm
            ${whereSql}
            ORDER BY cm.id DESC
            LIMIT $${paramsData.length - 1}
            OFFSET $${paramsData.length}
        `;

        const result = await pool.query(sql, paramsData);

        return res.json({
            ok: true,
            data: result.rows,
            meta: {
                total,
                page,
                limit,
                pages: Math.max(1, Math.ceil(total / limit)),
                count: result.rowCount ?? result.rows.length,
            },
        });
    } catch (e: any) {
        console.error("get clan members", {
            message: e?.message,
            code: e?.code,
            detail: e?.detail,
            hint: e?.hint,
            stack: e?.stack,
        });

        return res.status(500).json({ ok: false, error: "db error" });
    }
});

export default router;