import {prisma} from "../../config/prisma";
import {formatTimeInClan} from "../../libs/dateFormat";

type GetMembersParams = {
    clan_id: number;
    number: number;
    search: string;
}

export class ClanMemberService {

    async getClanMembers(clanId: number, search: string, number: number) {
        const isNumericSearch = /^\d+$/.test(search);

        const clanMembers = await prisma.clan_members.findMany({
            where: {
                clan_id: clanId,
                active: true,

                ...(search
                    ? {
                        OR: [
                            ...(isNumericSearch
                                ? [
                                    {
                                        pubg_id: {
                                            equals: BigInt(search),
                                        },
                                    },
                                ]
                                : []),

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
                        ],
                    }
                    : {
                        clan: number,
                    }),
            },
            take: 100,
            select: {
                id: true,
                name: true,
                nickname: true,
                city: true,
                pubg_id: true,
                age: true,
                created_at: true,
            },
        });

        return clanMembers.map((member) => ({
            ...member,
            id: member.id.toString(),
            pubg_id: member.pubg_id.toString(),
            timeInClan: member.created_at
                ? formatTimeInClan(member.created_at.toISOString())
                : "неизвестно",
        }));
    }

    async getClans(clanId: number) {
        console.log("clanId", clanId);
        const subclans = await prisma.subclans.findMany({
            where: {
                clan_id: clanId,
                active: true
            },
            select: {
                id: true,
                number: true,
                title: true,
                member_limit: true
            },
            orderBy:{
                number: "asc"
            }
        });

        const counts = await prisma.clan_members.groupBy({
            by: ["clan"],
            where: {
                clan_id: clanId,
                active: true,
            },
            _count: {
                id: true,
            },
        });

        return subclans.map((subclan) => {
            const count = counts.find(
                (item) => item.clan === subclan.number
            );

            return {
                ...subclan,
                real_count: count?._count.id ?? 0,
            };
        });
    }
}