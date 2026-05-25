import {prisma} from "../../config/prisma";
import {AuthRequest} from "../../middleware/auth.middleware";
import {Response} from "express";

export class ModerationService {
    async setModeration(actor_id: number, clan_id: number, number: number){
        const moderation = await prisma.clan_moderators.upsert({
            where: {
                clan_id_number_actor_id: {
                    actor_id: BigInt(actor_id),
                    clan_id: Number(clan_id),
                    number: Number(number),
                },
            },
            update: {},
            create: {
                actor_id: BigInt(actor_id),
                clan_id: Number(clan_id),
                number: Number(number),
            },
        });
        return moderation;
    }

    async removeModeration(actor_id: number, clan_id: number, number: number){
        const removed = await prisma.clan_moderators.deleteMany({
            where: {
                actor_id,
                clan_id,
                number
            }
        });

        if (removed) {
            return removed;
        }
        else return false
    }

    async setLeadership(actor_id: number, clan_id: string, number: number){
        const result = await prisma.subclans.updateMany({
            where: {
                clan_id: Number(clan_id),
                number: Number(number),
            },
            data: {
                leader_actor_id: BigInt(actor_id),
            },
        });

       if (result) {
           return result;
       }
       else return false;

    }
}
