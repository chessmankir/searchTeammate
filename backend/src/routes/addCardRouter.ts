import {pool} from "../db/db";
import {Card} from "../../types/Card";
import {getSession} from "../auth/session";
import {Router, Request, Response} from 'express';

const router = Router();
router.post('/', async (req: Request, res: Response) => {
    const {card_id, qualityId} = req.body;
    const sid = req.cookies?.sid;
    console.log("add");
    console.log(req.cookies);
    console.log("sid");
    try {
        if(!sid){
            console.log('!sid')
            return res.status(401).json(
                {ok: false, message: "Не авторизован"}
            )
        }
        const user =  await getSession(sid);
        console.log(user);
        if(!user){
            return  res.json({
                ok: false
            });
        }
        const query = `
            INSERT INTO user_card (id_user, quality_id, card_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

        const response = await pool.query(query,[user.id, qualityId, card_id]);
        console.log(response.rows);
        if(response.rows.length > 0){
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
        return  res.json({
            ok: false
        });
    }
});

export default router;