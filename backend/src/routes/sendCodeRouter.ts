import {Router, Request, Response} from 'express';
import {pool} from "../db/db";
import {bot} from "../Bot/bot";
import {createLoginCode} from "../auth/codes";

const router = Router();
router.post('/', async ( req: Request , res: Response) => {
    const {pubgId } = req.body;
    try{
        if(!pubgId){
            return res.status(400).json({
                ok: false,
                message: 'Пользователь с таким Pubg ID не найден'
            });
        }
        const query = `Select * from clan_members where pubg_id = $1`;
        const result = await pool.query(query,[pubgId]);
        if(result.rows.length === 0){
            return res.json({ok:false});
        }
        const member = result.rows[0];
        const code : string = createLoginCode(pubgId);
        const answerSendMessage = await bot.sendMessage(Number(member.actor_id), `Код для входа: ${code}` );
        console.log("answerSendMessage");
        console.log(answerSendMessage);
        if (result.rows.length > 0){
            return res.json({
                ok: true,
                member: {
                    id: member.id,
                    pubgId: member.pubgId,
                    actor_id: member.actor_id,
                    nickname: member.nickname,
                }
            })
        }
        return res.json({
            ok: false,

        })
    }
    catch (e){
        console.log(e);
        return res.json({
            ok: false,

        })
    }
});

export default router;