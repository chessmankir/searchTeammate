import {prisma} from "../../config/prisma";
import {serializeBigInt} from "../../libs/serializeBigInt";

export class CardService {
    async getCards(albumSlug: string, userId: number) {
        console.log(albumSlug);
        const cards = await prisma.cards.findMany({
            where: {
                album: {
                    slug: albumSlug,
                },
            },
            orderBy: {
                id: "asc",
            },
            take: 30,
            select: {
                id: true,
                name: true,
                imageSrc: true,
                album_id: true,
                quality: true,
                created_at: true,
                user_cards: {
                    where: {
                        id_user: userId,
                    },
                    select: {
                        id_user: true,
                        count: true,
                    },
                },
            },
        });

        const result = cards.map((card) => {
            const userCard = card.user_cards[0];

            return {
                id: card.id,
                name: card.name,
                imageSrc: card.imageSrc,
                album_id: card.album_id,
                quality: card.quality,
                created_at: card.created_at,
                id_user: userCard?.id_user ?? null,
                count: userCard?.count ?? null,
            };
        });

        return serializeBigInt(result);
    }

    async getAlbums(){
        const albums = await prisma.albums.findMany({
            select: {
                id: true,
                slug: true,
                name: true,
                imageSrc: true,
                total_cards: true
            }
        });
        return albums;
    }

    async addCard( userId: number, cardId: number ) {
        console.log(cardId);
        const userCard = await prisma.user_card.findFirst({
            where: {
                id_user: userId,
                card_id: cardId,
            },
        });

        if (userCard) {
            const updated = await prisma.user_card.update({
                where: {
                    id: userCard.id,
                },
                data: {
                    count: {
                        increment: 1,
                    },
                },
            });

            return serializeBigInt(updated);
        }

        const created = await prisma.user_card.create({
            data: {
                id_user: userId,
                card_id: cardId,
                count: 1,
            },
        });

        return serializeBigInt(created);
    }

    async removeCard(userId: number, cardId: number) {
        console.log("remove card");
        const userCard = await prisma.user_card.findFirst({
            where: {
                id_user: userId,
                card_id: cardId,
            },
        });

        if (!userCard) {
            return false;
        }

        if ((userCard.count ?? 1) > 1) {
            await prisma.user_card.update({
                where: {
                    id: userCard.id,
                },
                data: {
                    count: {
                        decrement: 1,
                    },
                },
            });

            return true;
        }

        await prisma.user_card.delete({
            where: {
                id: userCard.id,
            },
        });

        return true;
    }
}