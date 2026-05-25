import { prisma } from "../../../config/prisma";
import { io } from "../../../index";

export class MessageService {
    async createMessage(conversationId: number, userId: number, message: string) {
        return prisma.messages.create({
            data: {
                conversation_id: conversationId,
                sender_id: userId,
                body: message,
                created_at: new Date(),
            },
            select: {
                id: true,
                conversation_id: true,
                sender_id: true,
                body: true,
                created_at: true,
            },
        });
    }

    async getMessages(conversationId: number) {
        return prisma.messages.findMany({
            where: {
                conversation_id: conversationId,
            },
            orderBy: {
                id: "asc",
            },
        });
    }

    async getOtherParticipantId(conversationId: number, userId: number) {
        const otherParticipant =
            await prisma.conversation_participants.findFirst({
                where: {
                    conversation_id: conversationId,
                    user_id: {
                        not: userId,
                    },
                },
                select: {
                    user_id: true,
                },
            });

        return otherParticipant?.user_id ?? null;
    }

    async getStatus(userId: number, userBanId: number) {
        const [iBlockedHim, heBlockedMe] = await Promise.all([
            prisma.user_blocks.findFirst({
                where: {
                    blocker_id: userId,
                    blocked_id: userBanId,
                },
            }),

            prisma.user_blocks.findFirst({
                where: {
                    blocker_id: userBanId,
                    blocked_id: userId,
                },
            }),
        ]);

        return {
            iBlockedHim: Boolean(iBlockedHim),
            heBlockedMe: Boolean(heBlockedMe),
            isBlocked: Boolean(iBlockedHim || heBlockedMe),
        };
    }

    async blockUser(userId: number, userBanId: number) {
        await prisma.user_blocks.upsert({
            where: {
                blocker_id_blocked_id: {
                    blocker_id: userId,
                    blocked_id: userBanId,
                },
            },
            update: {},
            create: {
                blocker_id: userId,
                blocked_id: userBanId,
            },
        });

        io.to(`user:${userBanId}`).emit("block:changed", {
            blockerId: userId,
            blockedId: userBanId,
            type: "blocked",
        });

        return { blocked: true };
    }

    async unblockUser(userId: number, userBanId: number) {
        await prisma.user_blocks.deleteMany({
            where: {
                blocker_id: userId,
                blocked_id: userBanId,
            },
        });

        io.to(`user:${userBanId}`).emit("block:changed", {
            blockerId: userId,
            blockedId: userBanId,
            type: "unblocked",
        });

        return { blocked: false };
    }
}

export const messageService = new MessageService();