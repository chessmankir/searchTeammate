import {ModerationService} from "./moderation.service";
import {Response} from "express";
import {AuthRequest} from "../../middleware/auth.middleware";
import {serializeBigInt} from "../../libs/serializeBigInt";

const moderationService = new ModerationService();

export class ModerationController {
    async setModeration(req: AuthRequest, res: Response) {
        console.log("setModeration");
        const { actor_id, clan_id, number } = req.body;
        const moderation = await moderationService.setModeration(actor_id, clan_id, number);
        if(moderation) {
            return res.json(serializeBigInt({
                ok: true,
                moderation,
            }))
        }
        else{
            return res.json({
                ok: false,
            })
        }
    }

    async removeModeration(req: AuthRequest, res: Response){
        console.log("removeModeration");
        const { actor_id, clan_id, number } = req.body;
        const moderation = await moderationService.removeModeration(actor_id, clan_id, number);
        if(moderation) {
            return res.json(serializeBigInt({
                ok: true,
                moderation,
            }))
        }
        else{
            return res.json({
                ok: false,
            })
        }
    }

    async setLeadership(req: AuthRequest, res: Response) {
        console.log("setLeadership");
        const { actor_id, clan_id, number } = req.body;
        const subclan = await moderationService.setLeadership(actor_id, clan_id, number);
        if(subclan) {
            return res.json({
                ok: true,
            })
        }
        else{
            return res.json({
                ok: false,
                message: "Ошибка"
            })
        }
    }
}