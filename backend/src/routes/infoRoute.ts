import {Router, Request, Response} from "express";
import {getSession} from "../auth/session";
import {pool} from "../db/db";

const router = Router();
router.get('/', async (req: Request, res: Response) => {
    const sid = req.cookies?.sid;
    const user = await getSession(sid);
    if(!user){
        res.json({ok: false});
    }
    try{
        const query = "SELECT count(*) FROM clan_members WHERE clan_id = $1 AND active=TRUE";
        const data = await pool.query(query,[user.clan_id]);
        if(data?.rows.length > 0){
            res.json({ok: true, total: data?.rows[0].count});
        }
    }
    catch (e){
        console.log(e);
        res.json({ok: false});
    }
})

export default router;
