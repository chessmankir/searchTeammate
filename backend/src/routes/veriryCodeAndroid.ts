import {Router, Request, Response} from 'express';
import {pool} from "../db/db";
import {getLoginCode} from "../auth/codes";
import {createSession} from "../auth/session";

const router = Router();
router.post('/', async ( req: Request , res: Response) => {
    const {code, pubgId } = req.body;
    try{
        if(!code){
            return res.status(400).json({
                ok: false,
                message: 'Не получен код'
            });
        }
        const codeByPubgId = getLoginCode(pubgId);
        if(codeByPubgId?.code == code){
            //совпало
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
           WHERE pubg_id = $1`;
            const result = await pool.query(query,[pubgId]);
            if(result.rows.length === 0){
                return res.json({ok:false});
            }

            const user = result.rows[0];
            const sessionToken = await createSession(user.id);
            const k = await res.cookie('sid', sessionToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                maxAge: 1000*60*60*24*30
            });
            return  res.json({
                ok: true,
                user
            });
        }
        return  res.json({
            ok: false
        });
    }
    catch (e){
        console.log(e);
        return res.json({
            ok: false,
        })
    }
});

export default router;