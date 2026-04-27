import {Router, Request, Response} from 'express';
import {pool} from "../../db/db";

const router = Router();
router.post('/', async (req: Request, res: Response) => {
    try {
        console.log('ban');
        const {actor_id, id} = req.body;

        const query = `
            UPDATE clan_members
            SET active = false
            WHERE id = $1
            RETURNING *;
        `;

        const result = await pool.query(query, [id]);
        return res.json({
            ok: true,
            moderator: result.rows[0] || null,
        });

    } catch (e) {
        console.error(e);
        return res.json({ ok: false });
    }
});

export default router;