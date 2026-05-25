import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { updateMemberService } from "./profile.service";
import { serializeBigInt } from "../../libs/serializeBigInt";

export class UpdateMemberController {
    async updateMember(req: AuthRequest, res: Response) {
        try {
            const {
                nickname,
                age,
                city,
                name,
                pubgId,
                id,
                availableMicro,
                modes,
                status,
            } = req.body;

            const member = await updateMemberService.updateMember({
                id,
                nickname,
                age,
                city,
                name,
                pubgId,
                availableMicro,
                modes: modes ?? [],
                status,
            });

            return res.json(
                serializeBigInt({
                    ok: true,
                    member,
                })
            );
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                ok: false,
            });
        }
    }
}

export const updateMemberController = new UpdateMemberController();