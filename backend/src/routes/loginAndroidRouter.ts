import {Router, Response, Request} from 'express';
import {pool} from "../db/db";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { pubgId } = req.body;
    const query = `SELECT cm.*,
            COALESCE((
                            SELECT ARRAY_AGG(gm.name ORDER BY gm.name)
                            FROM member_modes mm
                            JOIN game_modes gm ON gm.id = mm.mode_id
                            WHERE mm.member_id = cm.id
                        ), '{}') AS modes 
           FROM clan_members cm WHERE pubg_id = ${pubgId}`;
    try{
        const response = await pool.query(query);

        if(response.rows.length > 0){
            if(!response.rows[0].status_game){
                response.rows[0].status_game = "all";
            }
            return res.json({
                ok: true,
                data: response.rows[0]
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