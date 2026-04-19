import { pool } from "../db/db";
import { getSession } from "../auth/session";
import {Router, Request, Response, response} from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    console.log('add card');
    const { card_id, userid } = req.body;
    console.log(userid);
    console.log(card_id);
    try {

        const findQuery = `
            SELECT *
            FROM user_card
            WHERE id_user = $1
              AND card_id = $2
            LIMIT 1
        `;

        const findResult = await pool.query(findQuery, [userid, card_id]);
        if (findResult.rows.length > 0) {
            const updateQuery = `
                UPDATE user_card
                SET count = count + 1
                WHERE id_user = $1
                  AND card_id = $2
                RETURNING *
            `;

            const updateResult = await pool.query(updateQuery, [userid, card_id]);

            return res.json({
                ok: true,
                data: updateResult.rows[0]
            });
        }

        const insertQuery = `
            INSERT INTO user_card (id_user, card_id, count)
            VALUES ($1, $2, 1)
            RETURNING *
        `;
        console.log('insertQuery');
        const insertResult = await pool.query(insertQuery, [userid, card_id]);

        return res.json({
            ok: true,
            data: insertResult.rows[0]
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: "Ошибка сервера"
        });
    }
});

export default router;