import {Router, Response, Request} from 'express';
import {pool} from "../db/db";
import {createLoginCode} from "../auth/codes";
import {bot} from "../Bot/bot";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    console.log("login");
    const { pubgId } = req.body;
    const query = `SELECT cm.*,
            COALESCE((
                            SELECT ARRAY_AGG(gm.name ORDER BY gm.name)
                            FROM member_modes mm
                            JOIN game_modes gm ON gm.id = mm.mode_id
                            WHERE mm.member_id = cm.id
                        ), '{}') AS modes, 
                CASE 
                    WHEN sc.leader_actor_id = cm.actor_id THEN TRUE 
                    ELSE FALSE 
                END AS "isLeader",
        
                CASE 
                    WHEN mod.actor_id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS "isModerator"
        
            FROM clan_members cm
        
            LEFT JOIN subclans sc 
                ON sc.clan_id = cm.clan_id
               AND sc.number = cm.clan
        
            LEFT JOIN clan_moderators mod 
                ON mod.actor_id = cm.actor_id
               AND mod.clan_id = cm.clan_id
           WHERE pubg_id = ${pubgId}`;
    try{
        const response = await pool.query(query);
        console.log(response.rows);
        if(response.rows.length > 0){
            const member = response.rows[0];
            console.log(member);
            if(!response.rows[0].status_game){
                response.rows[0].status_game = "all";
            }

            const code : string = createLoginCode(pubgId);
            console.log(code);
            const answerSendMessage = await bot.sendMessage(Number(member.actor_id), `Код для входа: ${code}` );
            console.log("answerSendMessage");
            console.log(answerSendMessage);
            return res.json({
                ok: true,
                data: code
            })
        }
        return res.json({
            ok: false,
            data: null
        })
    }
    catch (e){
        console.log(e);
    }
});

export default router;