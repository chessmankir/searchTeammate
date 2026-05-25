import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';

interface UserMiddleware{
    id: number,
    pubgId: string,
    actorId: string | null,
    clanId: number,
}

export interface AuthRequest extends Request{
    user?: UserMiddleware
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            ok: false,
            message: 'нет токена',
        });
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            ok: false,
            message: 'нет правильный формат',
        });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({
            ok: false,
            message: "JWT_SECRET_NOT_FOUND",
        });
    }
    
    try{
        const decoded = jwt.verify(token,jwtSecret) as UserMiddleware;
        req.user = decoded;
        next()
    }
    catch (e) {
        console.error(e);
        return res.status(401).json({
            ok: false,
            message: "Токен недействителен",
        });
    }

}