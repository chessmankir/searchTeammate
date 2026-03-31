import {pool} from "../db/db";
import {Member} from "../types/ClanMembers";

interface GetMembersParams {
    clan_id?: number | null;
    number?: number | null;
    limit?: number | null;
    id?: number | null;
    modes?: string[] | null;
}

export async function getMembers({
                                     clan_id = null,
                                     number = null,
                                     limit = 20,
                                     id = null,
                                     modes = ["classic"]
                                 }: GetMembersParams = {}){
    const where: string[] = [];
    const params: (number | string[] | null)[] = [];

    if (clan_id != null) {
        params.push(clan_id);
        where.push(`clan_id=$${params.length}`);
    }

    if (number != null) {
        params.push(number);
        where.push(`gm.name = ANY($${params.length})`);
    }

    if (modes && modes.length > 0) {
        const joinSql = "JOIN member_modes mm cm.id = mm.member_id" +
            "JOIN game_modes gm ON gm.id = mm.mode_id";
        params.push(modes);
        where.push();
    }

    params.push(limit);
    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const sql = `
    SELECT  * FROM clan_members
    ${whereSql}
    ORDER BY id DESC
    LIMIT $${params.length}
    `;
    console.log(sql);

    const result = await pool.query<Member>(sql, params);
    return result.rows;
}