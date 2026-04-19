import {Router, Request, Response} from "express";
import {getSession} from "../auth/session";
import {pool} from "../db/db";

const router = Router();
router.post('/', async(req: Request, res: Response) => {
    console.log("getUserCard");
    const sid = req.cookies?.sid;

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
    }

    const card_id = req.query.card_id;

    const query = `SELECT
    cm.id,
    cm.name,
    cm.nickname,
    cm.pubg_id,
    uc.count, (
        SELECT json_agg(c2)
        FROM (
            SELECT c.*
            FROM cards c
            WHERE c.id NOT IN (
                SELECT uc2.card_id
                FROM user_card uc2
                WHERE uc2.id_user = cm.id
            )
            LIMIT 3
        ) c2
    ) AS missing_cards
FROM user_card uc
INNER JOIN clan_members cm ON cm.id = uc.id_user
WHERE uc.card_id = $1
  AND uc.count > 1`;

    const data = await pool.query(query, [card_id])
    console.log(data.rows);
    return  res.json({
        ok: true,
        data: data.rows
    });
});

export default router;

