import {Router, Request, Response} from 'express';
import {pool} from '../db/db';

const router = Router();
router.get('/', async (req: Request, res: Response) => {
    const query = "SELECT * FROM albums LIMIT 20";
    const responseAnswer = await pool.query(query);
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