import {AuthRequest} from "../../middleware/auth.middleware";
import {Response} from "express";
import {ClanMemberService} from "./clanMember.service";
import {serializeBigInt} from "../../libs/serializeBigInt";

const clanMemberService = new ClanMemberService();

export class ClanMemberController {
    async getClanMembers(req: AuthRequest, res: Response) {
        const number = Number(req.query.number);
        const search = String(req.query.search ?? "");
        const clanId = Number(req.user!.clanId);
        try {
            const members = await clanMemberService.getClanMembers(clanId, search, number);
            res.status(200).json({
                ok: true,
                clanMembers: serializeBigInt( members),
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                ok: false,
                message: "Ошибка сервера",
            });
        }
    }

    async getClans(req: AuthRequest, res: Response) {
        const clanId = Number(req.user!.clanId);
        try{
            const clans = await clanMemberService.getClans(clanId);
            return res.status(200).json({
                ok: true,
                clans: serializeBigInt(clans),
            })
        }
        catch (e) {
            console.error(e);
            res.status(500).json({
                ok: false,
                message: "Ошибка сервера",
            });
        }
    }
}