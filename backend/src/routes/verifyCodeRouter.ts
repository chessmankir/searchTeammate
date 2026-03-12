import {Router, Request, Response} from 'express';
import {pool} from "../db/db";
import {getLoginCode} from "../auth/codes";

const router = Router();
router.post('/', async ( req: Request , res: Response) => {
    console.log(req.body);
    const {code, pubgId } = req.body;
    console.log("req.body");
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
            console.log("equal");
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