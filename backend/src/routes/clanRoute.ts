import {Router} from 'express';
import {pool} from "../db/db";

const router = Router();
router.get('/', async (req, res) => {
    const sql = `SELECT c.*, count(cm.id) as members_count FROM clans c 
            LEFT JOIN clan_members cm on c.id = cm.clan_id AND cm.active = TRUE
            GROUP BY c.id
            HAVING COUNT(cm.id) >= 10 
            ORDER BY id DESC
            LIMIT 30`;
    try {
        console.log('result');
        const result = await pool.query(sql);
        console.log(result.rows);
        return res.json({ok: true, data: result.rows});
    }
    catch(err) {
        return res.json({ok: false});
    }
});

export default router;