import {Router, Request, Response} from 'express';
import {pool} from '../db/db';
import {getSession} from "../auth/session";
import { mapCardRows } from "../utils/mapCardRows";

const router = Router();

/*
router.post("/", async (req: Request, res: Response) => {
    console.log("no albumId");

    const {userid} = req.body;

    let query = `
        SELECT c.*, uc.id_user,
               uc.quality_id,
               uc.count
        FROM cards c
        LEFT JOIN user_card uc 
            ON uc.card_id = c.id 
           AND uc.id_user = $1
    `;

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
*/

router.post('/:albumId', async (req: Request, res: Response) => {
    const { albumId } = req.params;
    const {userid} = req.body;
    const query = `
        SELECT c.*, uc.id_user, uc.count
        FROM cards c
        JOIN albums a ON a.id = c.album_id
        LEFT JOIN user_card uc ON uc.card_id = c.id 
            AND uc.id_user = $2
        WHERE a.id = $1
        ORDER BY c.id ASC
        LIMIT 30
    `;
    try {
        const responseAnswer = await pool.query(query, [albumId, userid]);
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