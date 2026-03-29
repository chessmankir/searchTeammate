import {getSession} from "../auth/session";
import {pool} from "../db/db";
import {response} from "express";

const {Router, Request, Response} = require('express');

const router = Router();
router.post('/', async (req: Request, res: Response) => {
    const {card_id, qualityId} = req.body;
    const sid = req.cookies?.sid;
    try {
        const user = await getSession(sid);
        if(!user?.id) return res.json({ok: false});

        const card = await getUserCard(user.id, card_id, qualityId);
        let queryUpdate = "";
        if (card?.count > 1){
           queryUpdate = `UPDATE user_card 
           SET count = count - 1
           WHERE id_user = $1 AND quality_id = $2 AND card_id = $3
           RETURNING *`;

        }
        else{
           queryUpdate = `DELETE FROM user_card 
           WHERE id_user = $1 AND quality_id = $2 AND card_id = $3
           RETURNING *`;
        }
        const responseUpdate = await pool.query(queryUpdate, [user.id, qualityId, card_id]);
        if(responseUpdate.rows.length > 0){
            return res.json({ok: true});
        }
        return res.json({ok: false});
    }
    catch (e) {
        console.log(e);
        return res.json({ok: false});
    }
});

async function  getUserCard(userId, cardId, qualityId) {
    const findQuery = `
            SELECT *
            FROM user_card
            WHERE id_user = $1
              AND card_id = $2
              AND quality_id = $3
            LIMIT 1
        `;

    const response = await pool.query(findQuery, [userId, cardId, qualityId]);
    console.log(response.rows);
    if(response.rows.length > 0){
        return response.rows[0];
    }
    else{
        return null
    }
}

export default router;