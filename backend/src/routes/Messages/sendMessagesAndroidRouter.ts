import {Router, Request, Response} from 'express';
import {getSession} from "../../auth/session";
import {pool} from "../../db/db";
import {io} from "../../index";

const router = Router();
router.post('/:conversation/send/messages', async (req: Request, res: Response) => {
    const {message, userid} = req.body;
    const conversation = Number(req.params.conversation);
    if (!message) {
        return res.json({
            ok: false,
            message: 'нет сообщения',
        });
    }
    if (!conversation) {
        return res.json({
            ok: false,
            message: 'не найден диалог',
        });
    }

    const query = `INSERT INTO messages (conversation_id, sender_id, body, created_at)
                            VALUES ($1, $2, $3, NOW()) RETURNING id, conversation_id, sender_id, body, created_at`
    try{
        const response = await pool.query(query, [conversation, userid, message]);
        if (response.rows.length > 0) {
            const targetId = await getOtherParticipantId(conversation, userid);
            const newMessage  = response.rows[0];
            const messageClient = {
                ...newMessage,
                time: new Date(newMessage.created_at).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            }
            console.log(`user:${userid}`);
            console.log('сейчас вызову сокет message:new');
            io.to(`user:${userid}`).emit("message:new", messageClient);
            console.log(targetId);
            if(targetId){
                io.to(`user:${targetId}`).emit("message:new", messageClient);
            }

            return res.json({
                ok: true,
                message: messageClient
            })
        }

        return res.json({
            ok: false,
        });
    }
    catch (e) {
        console.log(e);
    }

});

router.post('/:conversation/messages', async (req: Request, res: Response) => {
    const conversation = req.params.conversation;
    console.log(conversation);
    if (!conversation) {
        return res.json({
            ok: false,
            message: 'не найден диалог',
        });
    }

    const query = `SELECT * FROM messages WHERE conversation_id = $1 ORDER BY id ASC`;
    const response = await pool.query(query, [conversation]);
    console.log(response.rows);
    return res.json({
        ok: true,
        messages: response.rows
    })
})

async function getOtherParticipantId(conversationId: number, userId: number) {
    try {
        const otherParticipantQuery = `
            SELECT user_id
            FROM conversation_participants
            WHERE conversation_id = $1
              AND user_id != $2
            LIMIT 1
        `;

        const otherParticipantResponse = await pool.query(otherParticipantQuery, [
            conversationId,
            userId
        ]);
        const targetUserId = otherParticipantResponse.rows[0]?.user_id;
        return  targetUserId;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export default router;