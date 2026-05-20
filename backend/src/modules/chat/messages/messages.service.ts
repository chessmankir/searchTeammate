import { prisma } from "../../../config/prisma";

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
}

export const messageService = new MessageService();