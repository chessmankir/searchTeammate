import {prisma} from "../../config/prisma";
import {bot} from "../../Bot/bot";
import jwt from "jsonwebtoken";

export class AuthService {

    async requestCode(pubgId: number) {
        const user = await prisma.clan_members.findUnique({
            where: {
                pubg_id: pubgId,
            },
        });

        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        const code = this.createLoginCode(pubgId);
        await this.sendCode(String(user.actor_id), code);
        return code;
    }

    loginCodes: Map<number, LoginCode> = new Map<number, LoginCode>();

    createLoginCode(pubgId: number) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.loginCodes.set(pubgId, {
            pubgId: pubgId,
            code: code
        });
        return code;
    }

    async sendCode(actorId: string, code: string): Promise<void> {
        const answerSendMessage = await bot.sendMessage(actorId, `Код для входа: ${code}`);
    }

    async verifyCode(pubgId: number, code: string){
        if (!code) {
            throw new Error('CODE_NOT_FOUND');
        }
        const codePubgId = this.loginCodes.get(pubgId)?.code;
        if (codePubgId !== code) {
            throw new Error('CODE_NO_EQUAL');
        }
        const user = await prisma.clan_members.findUnique({
            where: {
                pubg_id: pubgId,
            }
        });
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }
        this.loginCodes.delete(pubgId);
        const  jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET_NOT_FOUND");
        }
        console.log(user);
        const token = jwt.sign({
            id: user.id,
            pubgId: pubgId.toString(),
            actorId: user.actor_id?.toString(),
            clanId: user.clan_id?.toString(),
        }, jwtSecret,
            {expiresIn: '30d'});
        const savedUser = {
            ...user,
            pubg_id: user.pubg_id.toString(),
            actor_id: user.actor_id ? user.actor_id.toString() : null,
            vk_id: user.vk_id ? user.vk_id.toString() : null,
            clan_id: user.clan_id ? Number(user.clan_id) : null,
        }
        return {token, user:savedUser };
    }

    async authMe(userId: number){
        const user = await prisma.clan_members.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        return {
            ...user,
            pubg_id: user.pubg_id.toString(),
            actor_id: user.actor_id ? user.actor_id.toString() : null,
            vk_id: user.vk_id ? user.vk_id.toString() : null,
            clan_id: user.clan_id ? user.clan_id.toString() : null,
        }
    }

}

interface LoginCode {
    pubgId: number,
    code: string
}