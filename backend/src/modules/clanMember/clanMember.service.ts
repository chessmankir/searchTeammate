import {prisma} from "../../config/prisma";
import {formatTimeInClan} from "../../libs/dateFormat";

type GetMembersParams = {
    clan_id: number;
    number: number;
    search: string;
}

export class ClanMemberService {

    async getClanMembers(clanId: number, search: string = "", number: number) {
        let whereSql = "";
        let params: any[] = [];

        const searchValue = search.trim();
        console.log(clanId);
        console.log(searchValue);
        console.log(number);
        if (searchValue) {
            whereSql = `
                cm.clan_id = $1
                AND cm.active = TRUE
                AND (
                    cm.pubg_id::text ILIKE $2
                    OR cm.nickname ILIKE $2
                    OR cm.name ILIKE $2
                )
            `;

            params = [clanId, `%${searchValue}%`];
        } else {
            whereSql = `
                cm.clan_id = $1
                AND cm.clan = $2
                AND cm.active = TRUE
            `;

            params = [clanId, number];
        }

        const query = `
            SELECT 
                cm.id,
                cm.name,
                cm.nickname,
                cm.city,
                cm.pubg_id,
                cm.age,
                cm.created_at,
                cm.clan,
                cm.clan_id,
                cm.actor_id,

                json_build_object(
                    'week', COALESCE((
                        SELECT SUM(md.msg_count)
                        FROM message_stats_daily md
                        WHERE md.user_id = cm.actor_id
                          AND md.day >= CURRENT_DATE - INTERVAL '6 days'
                    ), 0),

                    'month', COALESCE((
                        SELECT SUM(md.msg_count)
                        FROM message_stats_daily md
                        WHERE md.user_id = cm.actor_id
                          AND md.day >= CURRENT_DATE - INTERVAL '30 days'
                    ), 0),

                    'total', COALESCE((
                        SELECT SUM(ut.total_count)
                        FROM user_activity_totals ut
                        WHERE ut.user_id = cm.actor_id
                    ), 0),

                    'last_message_at', (
                        SELECT MAX(ut.last_msg_at)
                        FROM user_activity_totals ut
                        WHERE ut.user_id = cm.actor_id
                    )
                ) AS activity,

                CASE 
                    WHEN sc.leader_actor_id = cm.actor_id THEN TRUE 
                    ELSE FALSE 
                END AS "isLeader",

                CASE 
                    WHEN mod.actor_id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS "isModerator"

            FROM clan_members cm

            LEFT JOIN subclans sc 
                ON sc.clan_id = cm.clan_id
               AND sc.number = cm.clan

            LEFT JOIN clan_moderators mod 
                ON mod.actor_id = cm.actor_id
               AND mod.clan_id = cm.clan_id

            WHERE ${whereSql}

            LIMIT 100
        `;

        const members = await prisma.$queryRawUnsafe<any[]>(query, ...params);

        return members.map((member) => ({
            ...member,

            id: member.id.toString(),
            pubg_id: member.pubg_id.toString(),
            actor_id: member.actor_id ? member.actor_id.toString() : null,
            clan_id: member.clan_id ? Number(member.clan_id) : null,

            timeInClan: member.created_at
                ? formatTimeInClan(member.created_at)
                : "неизвестно",
        }));
    }

    async getClans(clanId: number) {
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