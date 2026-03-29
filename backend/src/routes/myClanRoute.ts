import {Router, Request, Response} from 'express';
import {pool} from "../db/db";
import {getSession} from "../auth/session";

const router = Router();
router.get('/', async (req: Request, res: Response) => {
  //  const {clan_id} = req.body;
    const sid = req.cookies?.sid;
    const user = await getSession(sid);
    const clan_id = user?.clan_id;
    const sql = `SELECT s.id, s.number, s.title, s.member_limit, COUNT(cm.id) as real_count FROM subclans s
                        LEFT JOIN clan_members cm 
                        ON cm.clan_id = s.clan_id AND s.number = cm.clan AND cm.active = TRUE
                        WHERE s.clan_id = $1
                        GROUP BY s.id ORDER BY s.number ASC`;
    try {
        const result = await pool.query(sql,[clan_id]);
        const clans = result.rows.map((clan) => ({...clan, name:  (clan.title != "") ? clan.title : `Клан ${clan.number}` }));
        return res.json({ok: true, clans: clans});
    }
    catch(err) {
        console.log(err);
        return res.json({ok: false});
    }
});

export default router;