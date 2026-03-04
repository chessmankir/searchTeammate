import {Router, Response, Request, json} from 'express';
import {pool} from "../db/db";
const tournamentRouter = new Router();

tournamentRouter.get('/',  async (request: Request, res: Response) => {
    const sql =
        `select t.id, t.clan_id, t.name, t.team_size, t.maps, t.created_at, COUNT(tp.id) from tournaments  t
         LEFT JOIN tournament_participants tp 
         ON tp.tournament_id = t.id
         GROUP BY t.id
         ORDER BY t.created_at DESC
         LIMIT 20`;
  //  const joint =  "JOIN tournament_participants tp ON tp.tournament_id"
    console.log('tournament router');
    try{
        const  result = await pool.query(sql);
        const tournaments = result.rows.map((t,i) => {
            const dateObj = new Date(t.created_at);
            const date = dateObj.toLocaleDateString('ru-RU'); // dd.mm.yyyy
            const time = dateObj.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            });

            return {...t, date: date, time: time};
        });
        return res.json({
            ok: true,
            data: tournaments
        });
    }
    catch (e){
        return res.status(500).json({
            ok:false,
            data: []
        })
    }
});

export default tournamentRouter;