import {Router, Request, Response} from 'express';
import {pool} from '../db/db';
import {getSession} from "../auth/session";
import { mapCardRows } from "../utils/mapCardRows";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    console.log("no albumId");

    const sid = req.cookies?.sid;
    const user = await getSession(sid);

    if (!user?.id) {
        return res.json({ ok: false });
    }

    const userid = user.id;
    const filter = String(req.query.filter || "all");
    console.log("filter");
    console.log(req.query.filter);
    const allowedFilters = ["all", "missing", "duplicates", "trades"];
    if (!allowedFilters.includes(filter)) {
        return res.status(400).json({
            ok: false,
            error: "invalid filter"
        });
    }

    let query = `
        SELECT c.*, uc.id_user,
               uc.quality_id,
               uc.count
        FROM cards c
        LEFT JOIN user_card uc 
            ON uc.card_id = c.id 
           AND uc.id_user = $1
    `;

    if (filter === "missing") {
        query += `
            WHERE c.id NOT IN (
                SELECT uc2.card_id
                FROM user_card uc2
                WHERE uc2.id_user = $1
            )
        `;
    }

    if (filter === "duplicates") {
        query += `
            WHERE c.id IN (
                SELECT uc2.card_id
                FROM user_card uc2
                WHERE uc2.id_user = $1
                GROUP BY uc2.card_id
                HAVING SUM(uc2.count) > 1
            )
        `;
    }

    query += `
        ORDER BY c.id ASC
        LIMIT 50
    `;

    try {
        const responseAnswer = await pool.query(query, [userid]);

        return res.json({
            ok: true,
            data: mapCardRows(responseAnswer.rows)
        });
    } catch (e) {
        console.log(e);
        return res.json({
            ok: false
        });
    }
});

router.get('/:albumId', async (req: Request, res: Response) => {
    const { albumId } = req.params;
    const sid = req.cookies?.sid;
    const user = await getSession(sid);
    if (!user?.id) return res.json({ ok: false });

    const userid = user.id;

    const query = `
        SELECT c.*, uc.id_user, c.quality,
               uc.count
        FROM cards c
        JOIN albums a ON a.id = c.album_id
        LEFT JOIN user_card uc ON uc.card_id = c.id 
            AND uc.id_user = $2
        WHERE a.slug = $1
        ORDER BY c.id ASC
        LIMIT 30
    `;

    try {
        console.log("before response");
        const responseAnswer = await pool.query(query, [albumId, userid]);
        console.log("after response");
        return res.json({
            ok: true,
            data: responseAnswer.rows
        });
    } catch (e) {
        console.log(e);
        return res.json({
            ok: false
        });
    }
});

export default router;