import { Router, Request, Response } from "express";
import { pool } from "../db/db";
import type { Member } from "../../types/ClanMembers";
import {getSession} from "../auth/session";

const router = new Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        // --- parse query ---
        const clan_id = req.query.clan_id ? Number(req.query.clan_id) : undefined;
        const number = req.query.number ? Number(req.query.number) : undefined;

        const pubg_id = req.query.pubg_id ? Number(req.query.pubg_id) : undefined;

        const limitRaw = req.query.limit ? Number(req.query.limit) : 30;
        const pageRaw = req.query.page ? Number(req.query.page) : 1;

        const ageFrom = req.query.ageFrom ? Number(req.query.ageFrom) : undefined;
        const ageTo = req.query.ageTo ? Number(req.query.ageTo) : undefined;

        const modesRaw = typeof req.query.modes === "string" ? req.query.modes : "";
        const timeRaw = typeof req.query.timemode === "string" ? req.query.timemode : "";

        const modes =
            modesRaw.trim().length > 0 ? modesRaw.split(",").map(s => s.trim()).filter(Boolean) : [];

        const timeModes =
            timeRaw.trim().length > 0 ? timeRaw.split(",").map(s => s.trim()).filter(Boolean) : [];

        // --- safe paging ---
        const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 30;
        const page = Number.isFinite(pageRaw) ? Math.max(1, pageRaw) : 1;
        const offset = (page - 1) * limit;

        // --- build sql ---
        const where: string[] = [];
        const params: any[] = [];
        let joinSql = "";

        if(pubg_id !== undefined){
            if(pubg_id == 1){
                const sid = req.cookies?.sid;
                const user = await getSession(sid);
                params.push(user.pubg_id);
            }
            else{
                params.push(pubg_id);

            }
            where.push(`cm.pubg_id = $${params.length}`);
        }

        if (clan_id !== undefined && Number.isFinite(clan_id)) {
            params.push(clan_id);
            where.push(`cm.clan_id = $${params.length}`);
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
            joinSql += `
        JOIN member_modes mm ON cm.id = mm.member_id
        JOIN game_modes gm ON gm.id = mm.mode_id
      `;
            params.push(modes);
            where.push(`gm.name = ANY($${params.length}::text[])`);
        }

        if (timeModes.length > 0) {
            joinSql += `
        JOIN member_time_slots mts ON mts.member_id = cm.id
        JOIN time_slots ts ON ts.id = mts.time_slot_id
      `;
            params.push(timeModes);
            where.push(`ts.name = ANY($${params.length}::text[])`);
        }

        const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
        // --- total ---
        const sqlTotal = `
      SELECT COUNT(DISTINCT cm.id) AS total
      FROM clan_members cm
      ${joinSql}
      ${whereSql}
    `;
        const resultTotal = await pool.query(sqlTotal, params);
        const total = Number(resultTotal.rows[0]?.total ?? 0);

        // --- data ---
        const paramsData = [...params, limit, offset];
        const sql = `
      SELECT DISTINCT cm.*
      FROM clan_members cm
      ${joinSql}
      ${whereSql}
      ORDER BY cm.id DESC
      LIMIT $${paramsData.length - 1}
      OFFSET $${paramsData.length}
    `;
        const result = await pool.query<Member>(sql, paramsData);

        return res.json({
            ok: true,
            data: result.rows,
            meta: {
                total,
                page,
                limit,
                pages: Math.max(1, Math.ceil(total / limit)),
                count: result.rowCount ?? result.rows.length, // сколько пришло на этой странице
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