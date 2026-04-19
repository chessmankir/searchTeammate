import {Router, Request, Response} from "express";
import {getSession} from "../auth/session";
import {pool} from "../db/db";

const router = Router();
router.get('/', async(req: Request, res: Response) => {
    /*const sid = req.cookies?.sid;

    if(!sid){
        return res.json({
            ok: false,
            message: "нет куков"
        });
    }

    const user = await getSession(sid);
    if (!user) {
        return res.json({
            ok: false,
            message: "ошибка авторизации"
        })
    }*/

    const card_id = req.query.card_id;

    const query = `SELECT c.*, a.name as album_name FROM cards c
        LEFT JOIN albums a ON a.id = c.album_id
        WHERE c.id = $1`;
    const data = await pool.query(query, [card_id])
    return  res.json({
        ok: true,
        data: data.rows[0]
    });
});

export default router;

