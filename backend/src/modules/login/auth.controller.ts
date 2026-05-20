import {AuthService} from "./auth.service";
import {Request, Response} from "express";
import {AuthRequest} from "../../middleware/auth.middleware";

const authService = new AuthService();

export class AuthController{
     async requestCode(req: Request, res: Response)  {
        const {pubgId} = req.body;
        try {
            await authService.requestCode(pubgId);
            return res.json({
                ok: true,
                message: "Код отправлен в Telegram"
            })
        }
        catch (error: any) {
            console.log(error);
            if(error.message == "USER_NOT_FOUND"){
                return res.status(403).json({
                    ok: false,
                    message: `Пользователь не найден`,
                })
            }
            return res.status(500).json({
                ok: false,
                message: error.message
            })
        }
    }

    async verifyCode(req: Request, res: Response){
         try{
             const {pubgId, code} = req.body;
             const result = await authService.verifyCode(pubgId, code);
             return res.json({
                 ok: true,
                 token: result.token,
                 user: result.user,
             })
         }
         catch (e: any) {
             console.log(e);
             if(e.message == "USER_NOT_FOUND"){
                 return res.status(400).json({
                     ok: false,
                     message: "Не найден пользователь"
                 })
             }
             if(e.message == "CODE_NO_EQUAL"){
                 return res.status(400).json({
                     ok: false,
                     message: "Не совпадает код"
                 })
             }
             if(e.message == "CODE_NOT_FOUND"){
                 return res.status(400).json({
                     ok: false,
                     message: "Не найден код"
                 })
             }
             return res.status(500).json({
                ok: false,
                message: "Ошибка сервера"
             })
         }
    }

    async autme(req: AuthRequest, res: Response){
         try{
            const userId = req.user?.id;
            if(!userId){
                return res.status(401).json({
                    ok: false,
                    message: "пользователь не авторизован"
                })
            }
            const user = await authService.authMe(userId);

            return res.json({
                ok: true,
                user
            });
        }
         catch (e: any) {
             console.log(e);
             return res.status(500).json({
                 ok: false,
                 message: "Ошибка сервера"
             })
         }

    }
}

