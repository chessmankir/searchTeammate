import {Router, Request, Response} from 'express';
import {getSession} from "../../auth/session";
import {pool} from "../../db/db";

const router = Router();
router.get('/:conversationId', async (req: Request, res: Response) => {
    console.log("get");
    try {
        const sid = req.cookies?.sid;
        const user = await getSession(sid);

        if (!user?.id) {
            return res.status(401).json({
                ok: false,
                message: "Не авторизован"
            });
        }

        const currentUserId = Number(user.id);
        const conversationId = Number(req.params.conversationId);

        if (!conversationId) {
            return res.status(400).json({
                ok: false,
                message: "Некорректный conversationId"
            });
        }

        const response = await pool.query(
            `
            SELECT
                c.id AS conversation_id,
                cm.id AS user_id,
                cm.nickname,
                cm.pubg_id,
                cm.name
            FROM conversations c
            JOIN conversation_participants cp_self
                ON cp_self.conversation_id = c.id
               AND cp_self.user_id = $1
            JOIN conversation_participants cp_other
                ON cp_other.conversation_id = c.id
               AND cp_other.user_id != $1
            JOIN clan_members cm
                ON cm.id = cp_other.user_id
            WHERE c.id = $2
            LIMIT 1
            `,
            [currentUserId, conversationId]
        );

        if (response.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "Диалог не найден или нет доступа"
            });
        }

        return res.json({
            ok: true,
            data: response.rows[0]
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: "Ошибка сервера"
        });
    }
})
export default  router;