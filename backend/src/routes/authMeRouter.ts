import {Router, Request, Response} from 'express';

import {getSession} from "../auth/session";

const router = Router();
router.get('/', async (req: Request, res: Response) => {
    const sid = req.cookies?.sid;
    if(!sid){
        return res.status(401).json(
            {ok: false, message: "Не авторизован"}
        )
    }
    const user =  await getSession(sid);
    if(!user){
        return res.status(401).json({
            ok: false,
            message: "Сессия не найдена"
        });
    }

    return res.json({
        ok: true,
        user
    })
});

export default router;