import { Router, Request, Response } from 'express';
import {getSession} from "../auth/session";
import {pool} from "../db/db";
import {userInfo} from "node:os";

const router = Router();
router.put('/', async (req: Request, res: Response) => {
    const sid = req.cookies?.sid;
    if (!sid) {
        return res.status(401).json({
            ok: false,
            message: "Не авторизован",
        });
    }
    const user = await getSession(sid);
    if (!user) {
        return res.status(401).json({
            ok: false,
            message: "Сессия не найдена",
        });
    }
    const {nickname, age,  city, name, pubgId, id, availableMicro, modes} = req.body;
    const query = `UPDATE clan_members SET
                            nickname=$1, age=$2, city=$3, pubg_id=$4, name=$5, available_micro=$6 WHERE id = $7 
                            RETURNING *`;

    try{
        const data = await pool.query(query, [nickname, age, city,  pubgId, name, availableMicro, id]);
        await  deleteGameModeMember(user.id);
        await addGameModeMember(user.id, modes);
        return res.json({ok: true});
    }
    catch(err){
        console.log(err);
    }

});

const modeMap: Record<string, number> = {
    classic: 1,
    metro: 2,
    tdm: 3,
    ultimate: 4,
};

const deleteGameModeMember = async function (userId: number){
    const query = `DELETE FROM member_modes WHERE member_id = $1`;
    try{
        const data = await pool.query(query, [userId]);
        return true;
    }
    catch(err){
        console.log(err);
        return  false;
    }
}

const addGameModeMember = async function (userId: number, modes: string[]){
    if (!modes.length) return true;
    const query = `INSERT INTO member_modes (member_id, mode_id) VALUES ($1, $2)`;
    for (const mode of modes){
        const mode_id = modeMap[mode];
        try{
            const data = await pool.query(query, [userId, mode_id]);
        }
        catch(err){
            console.log(err);
            return  false;
        }
    }
}

export default router;