import {Router, Request, Response} from "express";
import {getSession} from "../../auth/session";
import {pool} from "../../db/db";

const router = Router();
//Получение диалога
router.get('/', async (req: Request, res: Response) => {
    const member_id = Number(req.query.member_id);
    if (!member_id) {
        res.json({ok: false, message: "нет собседеника"});
    }
    const sid = req.cookies?.sid;
    const user = await getSession(sid);
    if (!user) {
        return res.status(401).json({ ok: false, error: "Unauthorized" });
    }

    if (!user.id) {
        res.json({ok: false, message: "не авторизован"});
    }

    if (user.id == member_id) {
        res.json({ok: false, message: "нельзя писать самому себе"});
    }
    try{
        const checkConversationId = await checkConversation(member_id, user.id);
        if (checkConversationId) {
            return res.json({
                ok: true,
                conversationId: checkConversationId,
            });
        }
        const conversationId = await createConversation();
        try{
            createConversationParticipant(conversationId, user.id, member_id);
        }
        catch (e){

        }
        return res.json({
            ok: true,
            conversationId: conversationId
        });
    }
    catch (e){
        return res.json({
            ok: false,
        });
    }
});

async function checkConversation(userId: number, targetUserId: number) {
    try {
        const query = `SELECT c.id FROM conversations c
                JOIN conversation_participants p1 on p1.conversation_id = c.id
                JOIN conversation_participants p2 on p2.conversation_id = c.id
                WHERE p1.user_id = $1 AND p2.user_id = $2
                LIMIT 1`;
        const response = await pool.query(query, [userId, targetUserId]);
        if (response.rows.length > 0) {
            return response.rows[0].id;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
    }
}

async function createConversation() {

    try {
        const query = `INSERT INTO conversations DEFAULT  VALUES RETURNING id`;
        const response = await pool.query(query);
        if (response.rows.length > 0) {
            return response.rows[0].id;
        }
    } catch (e) {
        console.log(e);
    }
    return false;
}

async function createConversationParticipant(conversationId: number, userId: number, targetUserId: number) {
    try {
        const query = `INSERT INTO conversation_participants (conversation_id, user_id)
            VALUES ($1, $2), ($1, $3) `;
        const response = await pool.query(query, [conversationId, targetUserId, userId]);
        console.log(response.rows);
    }
    catch (e){

        console.log(e);
    }
}

export default router;
