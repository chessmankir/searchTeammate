import {Router, Request, Response} from "express";
import {getSession} from "../auth/session";
import {pool} from "../db/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const sid = req.cookies?.sid;
        const user = await getSession(sid);

        if (!user?.id) {
            return res.json({ok: false});
        }

        const query = `
            SELECT
                c.id AS conversation_id,
                cm.id AS user_id,
                cm.nickname,
                last_message.body AS last_message
            FROM conversations c
            JOIN conversation_participants cp_self
                ON c.id = cp_self.conversation_id
               AND cp_self.user_id = $1
            JOIN conversation_participants cp_other
                ON c.id = cp_other.conversation_id
               AND cp_other.user_id != $1
            JOIN clan_members cm
                ON cp_other.user_id = cm.id
            LEFT JOIN LATERAL (
                SELECT m.body
                FROM messages m
                WHERE m.conversation_id = c.id
                ORDER BY m.id DESC
                LIMIT 1
            ) last_message ON TRUE
            ORDER BY c.id DESC
        `;

        const response = await pool.query(query, [user.id]);
        return res.json({
            ok: true,
            conversations: response.rows
        });
    } catch (err) {
        console.log(err);
        return res.json({ok: false});
    }
});

export default router;