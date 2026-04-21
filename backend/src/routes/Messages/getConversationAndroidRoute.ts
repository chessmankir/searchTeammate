import {Router, Request, Response} from "express";
import {getSession} from "../../auth/session";
import {pool} from "../../db/db";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const {userid} = req.body;
        const query = `
            SELECT
                c.id AS conversation_id,
                cm.id AS user_id,
                cm.nickname,
                last_message.body AS last_message,
                COALESCE(unread.unread_count, 0) AS unread_count
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
            LEFT JOIN LATERAL (
                SELECT COUNT(*) AS unread_count
                FROM messages m
                WHERE m.conversation_id = c.id
                    AND m.sender_id != $1 
                    AND m.read_at IS NULL
            ) unread ON TRUE
            ORDER BY c.id DESC
        `;

        const response = await pool.query(query, [userid]);
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