import {Router, Request, Response} from 'express';
import {pool} from "../db/db";
import {getLoginCode} from "../auth/codes";
import {createSession} from "../auth/session";

const router = Router();
router.post('/', async ( req: Request , res: Response) => {
    const {code, pubgId } = req.body;
    console.log('роутер проверки');
    console.log(code);
    console.log(pubgId);
    try{
        if(!code){
            return res.status(400).json({
                ok: false,
                message: 'Не получен код'
            });
        }
        const codeByPubgId = getLoginCode(pubgId);
        if(codeByPubgId?.code === code){
            //совпало
            const query = `Select * from clan_members where pubg_id = $1`;
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
                ok: true
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