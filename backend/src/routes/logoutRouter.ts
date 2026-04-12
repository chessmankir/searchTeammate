import {Router, Request, Response} from 'express';
import {deleteSession} from "../auth/session";

const router = Router();
router.post("/", (req: Request, res: Response) => {
    const sid = req.cookies?.sid;
    console.log('logout');
    if(sid){
        deleteSession(sid);
    }

    res.clearCookie("sid");
    return res.json({ok: true});
});

export default router;