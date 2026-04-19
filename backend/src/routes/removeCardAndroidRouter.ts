import {getSession} from "../auth/session";
import {pool} from "../db/db";
import {Router, Response, Request} from 'express';

const router = Router();
router.post('/', async (req: Request, res: Response) => {
    const {card_id, userid} = req.body;
    try {

        const card = await getUserCard(userid, card_id);
        let queryUpdate = "";
        if (card?.count > 1){
            queryUpdate = `UPDATE user_card 
           SET count = count - 1
           WHERE id_user = $1  AND card_id = $2
           RETURNING *`;

        }
        else{
            queryUpdate = `DELETE FROM user_card 
           WHERE id_user = $1  AND card_id = $2
           RETURNING *`;
        }
        const responseUpdate = await pool.query(queryUpdate, [userid, card_id]);
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

async function getUserCard(userId: number, cardId: number) {
    const findQuery = `
            SELECT *
            FROM user_card
            WHERE id_user = $1
              AND card_id = $2
            LIMIT 1
        `;

    const response = await pool.query(findQuery, [userId, cardId]);
    console.log(response.rows);
    if(response.rows.length > 0){
        return response.rows[0];
    }
    else{
        return null
    }
}

export default router;