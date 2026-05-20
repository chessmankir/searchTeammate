import {prisma} from "../../../config/prisma";

export class ConversationService{
    async getConversations(userId: number) {
        const conversations = await prisma.conversations.findMany({
            where: {
                conversation_participants: {
                    some: {
                        user_id: userId,
                    },
                },
            },
            include: {
                conversation_participants: {
                    where: {
                        user_id: {
                            not: userId,
                        },
                    },
                    include: {
                        clan_members: {
                            select: {
                                id: true,
                                nickname: true,
                            },
                        },
                    },
                },
                messages: {
                    orderBy: {
                        id: "desc",
                    },
                    take: 1,
                    select: {
                        body: true,
                    },
                },
            },
            orderBy: {
                id: "desc",
            },
        });
        return conversations.map((conversation) => {
            const otherUser =
                conversation.conversation_participants[0]?.clan_members;

            const unreadCount = 0;

            return {
                conversation_id: conversation.id,
                user_id: otherUser?.id,
                nickname: otherUser?.nickname,
                last_message: conversation.messages[0]?.body ?? null,
                unread_count: unreadCount,
            };
        });
    }

    async getConversationById(currentUserId: number, conversationId: number) {
        const conversation = await prisma.conversations.findFirst({
            where: {
                id: conversationId,
                conversation_participants: {
                    some: {
                        user_id: currentUserId,
                    },
                },
            },
            include: {
                conversation_participants: {
                    where: {
                        user_id: {
                            not: currentUserId,
                        },
                    },
                    include: {
                        clan_members: {
                            select: {
                                id: true,
                                nickname: true,
                                pubg_id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!conversation) {
            return null;
        }

        const otherUser =
            conversation.conversation_participants[0]?.clan_members;

        if (!otherUser) {
            return null;
        }

        return {
            conversation_id: conversation.id,
            user_id: otherUser.id,
            nickname: otherUser.nickname,
            pubg_id: otherUser.pubg_id,
            name: otherUser.name,
        };
    }

    async markConversationAsRead(conversationId: number, currentUserId: number) {
        return prisma.messages.updateMany({
            where: {
                conversation_id: conversationId,
                sender_id: {
                    not: currentUserId,
                },
                read_at: null,
            },
            data: {
                read_at: new Date(),
            },
        });
    }
}