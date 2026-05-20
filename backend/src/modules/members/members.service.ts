import { prisma } from "../../config/prisma";

type MemberParams = {
    clan_id?: number;
    number?: number;
    pubg_id?: string;
    search?: string;
    status?: string;
    availableMicro?: boolean;
    ageFrom?: number;
    ageTo?: number;
    modes?: string[];
    timeModes?: string[];
    limit?: number;
    page?: number;
};

export class MembersService {
    async getMembers(params: MemberParams) {
        console.log("MembersService");
        console.log(params);
        const {
            clan_id,
            number,
            pubg_id,
            search,
            status,
            availableMicro,
            ageFrom,
            ageTo,
            modes = [],
            timeModes = [],
            limit = 30,
            page = 1,
        } = params;

        const skip = (page - 1) * limit;

        const where: any = {};

        if (search) {
            const or: any[] = [
                {
                    nickname: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ];

            if (/^\d+$/.test(search)) {
                or.push({
                    pubg_id: BigInt(search),
                });
            }

            where.OR = or;
        } else {
            if (pubg_id) {
                where.pubg_id = BigInt(pubg_id);
            }

            if (clan_id) {
                where.clan_id = BigInt(clan_id);
            }

            if (number) {
                where.clan = number;
            }

            if (status) {
                where.status_game = status;
            }

            if (availableMicro) {
                where.available_micro = true;
            }

            if (ageFrom || ageTo) {
                where.age = {};

                if (ageFrom) {
                    where.age.gte = ageFrom;
                }

                if (ageTo) {
                    where.age.lte = ageTo;
                }
            }

            if (modes.length > 0) {
                where.member_modes = {
                    some: {
                        game_modes: {
                            name: {
                                in: modes,
                            },
                        },
                    },
                };
            }

            if (timeModes.length > 0) {
                where.member_time_slots = {
                    some: {
                        time_slots: {
                            name: {
                                in: timeModes,
                            },
                        },
                    },
                };
            }
        }

        const [members, total] = await Promise.all([
            prisma.clan_members.findMany({
                where,
                orderBy: {
                    id: "desc",
                },
                take: limit,
                skip,
                include: {
                    clans: true,
                    member_modes: {
                        include: {
                            game_modes: true,
                        },
                    },
                    member_time_slots: {
                        include: {
                            time_slots: true,
                        },
                    },
                },
            }),

            prisma.clan_members.count({
                where,
            }),
        ]);

        const data = members.map((member) => ({
            ...member,
            pubg_id: member.pubg_id.toString(),
            actor_id: member.actor_id ? member.actor_id.toString() : null,
            vk_id: member.vk_id ? member.vk_id.toString() : null,
            clan_id: member.clan_id ? member.clan_id.toString() : null,

            clan_name: member.clans?.name ?? null,

            modes: member.member_modes.map(
                (item) => item.game_modes.name
            ),

            time_modes: member.member_time_slots.map(
                (item) => item.time_slots.name
            ),
        }));

        return {
            data,
            meta: {
                total,
                page,
                limit,
                pages: Math.max(1, Math.ceil(total / limit)),
                count: data.length,
            },
        };
    }
}