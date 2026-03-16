import {Router, Request, Response} from 'express';
import {pool} from '../db/db';

const router = Router();
router.get('/:albumid', async (req: Request, res: Response) => {
    const {albumid} = req.params;
    console.log(albumid);
    const query = `
            SELECT c.*
            FROM cards c
            JOIN albums a ON a.id = c.album_id
            WHERE a.slug = $1
            ORDER BY c.id ASC
            LIMIT 30
        `;
    const responseAnswer = await pool.query(query,[albumid]);
    if(!responseAnswer){
        return res.json({
            ok: false,
        })
    }
    return res.json({
        ok: true,
        data: responseAnswer.rows
    });
});

export default router;