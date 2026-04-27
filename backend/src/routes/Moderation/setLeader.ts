import {Router, Request, Response} from 'express';
import {pool} from "../../db/db";

const router = Router();
router.post('/', async (req: Request, res: Response) => {
    try {
        console.log('sub clans');
        const {userid, clan_id, number, actor_id} = req.body;
        console.log(clan_id, number, actor_id);
        const query = `
            UPDATE subclans
            SET leader_actor_id = $1
            WHERE clan_id = $2
              AND number = $3
            RETURNING *;
        `;
        console.log(actor_id);
        const response = await pool.query(query, [actor_id, clan_id, number]);
        console.log(response.rows);
        return res.json({ok: true});
    } catch (e) {
        console.error(e);
        return res.json({ok: false});
    }
});

export default router;