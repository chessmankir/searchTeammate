import { Router, Request, Response } from 'express';
import { pool } from "../../db/db";

const router = Router();

router.post('/set', async (req: Request, res: Response) => {
    try {
        console.log('set');
        const {actor_id, userid, clan_id, number} = req.body;

        const query = `
            INSERT INTO clan_moderators (actor_id, clan_id, number)
            VALUES ($1, $2, $3)
            ON CONFLICT (actor_id, clan_id, number) DO NOTHING
            RETURNING *;
        `;

        const result = await pool.query(query, [actor_id, clan_id, number]);
        return res.json({
            ok: true,
            moderator: result.rows[0] || null,
        });

    } catch (e) {
        console.error(e);
        return res.json({ ok: false });
    }
});

router.post('/remove', async (req: Request, res: Response) => {
    console.log('remove');
    try {
        const { userid, actor_id, clan_id, number } = req.body;

        const query = `
            DELETE FROM clan_moderators
            WHERE actor_id = $1
              AND clan_id = $2
              AND number = $3
            RETURNING *;
        `;

        const result = await pool.query(query, [actor_id, clan_id, number]);

        if (result.rowCount === 0) {
            return res.json({ ok: false, message: "Moderator not found" });
        }

        return res.json({
            ok: true,
            removed: result.rows[0],
        });

    } catch (e) {
        console.error(e);
        return res.json({ ok: false });
    }
});

export default router;