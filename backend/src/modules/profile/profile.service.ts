import { prisma } from "../../config/prisma";

const modeMap: Record<string, number> = {
    classic: 1,
    metro: 2,
    tdm: 3,
    ultimate: 4,
};

export class UpdateMemberService {
    async updateMember(data: {
        id: number;
        nickname: string;
        age: number;
        city: string;
        name: string;
        pubgId: number;
        availableMicro: boolean;
        status: string;
        modes: string[];
    }) {
        const {
            id,
            nickname,
            age,
            city,
            name,
            pubgId,
            availableMicro,
            status,
            modes,
        } = data;

        const member = await prisma.clan_members.update({
            where: {
                id: Number(id),
            },
            data: {
                nickname,
                age: Number(age),
                city,
                pubg_id: Number(pubgId),
                name,
                available_micro: availableMicro,
                status_game: status,
            },
        });

        await prisma.member_modes.deleteMany({
            where: {
                member_id: Number(id),
            },
        });

        const modesData = modes
            .map((mode) => modeMap[mode])
            .filter(Boolean)
            .map((mode_id) => ({
                member_id: Number(id),
                mode_id,
            }));

        if (modesData.length > 0) {
            await prisma.member_modes.createMany({
                data: modesData,
            });
        }

        return member;
    }
}

export const updateMemberService = new UpdateMemberService();