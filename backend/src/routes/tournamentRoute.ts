import {Router, Response, Request, json} from 'express';
import {pool} from "../db/db";
const tournamentRouter = new Router();

tournamentRouter.get('/',  async (request: Request, res: Response) => {
    const sql = "" +
        "select * from tournaments LIMIT 20";
    try{
        const  result = await pool.query(sql);
        console.log(result.rows);
        return res.json({
            ok: true,
            data: result.rows
        });
    }
    catch (e){
        return res.status(500).json({
            ok:false
        })
    }
});

export default tournamentRouter;