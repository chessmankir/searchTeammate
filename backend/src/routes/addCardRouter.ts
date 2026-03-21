import { pool } from "../db/db";
import { getSession } from "../auth/session";
import {Router, Request, Response, response} from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { card_id, qualityId } = req.body;
    const sid = req.cookies?.sid;

    try {
        if (!sid) {
            return res.status(401).json({
                ok: false,
                message: "Не авторизован"
            });
        }

        const user = await getSession(sid);

        if (!user) {
            return res.status(401).json({
                ok: false,
                message: "Пользователь не найден"
            });
        }

        const findQuery = `
            SELECT *
            FROM user_card
            WHERE id_user = $1
              AND quality_id = $2
              AND card_id = $3
            LIMIT 1
        `;

        const findResult = await pool.query(findQuery, [user.id, qualityId, card_id]);
        console.log(findResult.rows.length);
        if (findResult.rows.length > 0) {
            console.log('update');
            const updateQuery = `
                UPDATE user_card
                SET count = count + 1
                WHERE id_user = $1
                  AND quality_id = $2
                  AND card_id = $3
                RETURNING *
            `;

            const updateResult = await pool.query(updateQuery, [user.id, qualityId, card_id]);

            return res.json({
                ok: true,
                data: updateResult.rows[0]
            });
        }

        const insertQuery = `
            INSERT INTO user_card (id_user, quality_id, card_id, count)
            VALUES ($1, $2, $3, 1)
            RETURNING *
        `;
        console.log('insertQuery');
        const insertResult = await pool.query(insertQuery, [user.id, qualityId, card_id]);

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