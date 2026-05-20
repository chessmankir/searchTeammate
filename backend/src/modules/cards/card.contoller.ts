import {AuthRequest} from "../../middleware/auth.middleware";
import {Response} from "express";
import {CardService} from "./card.service";
import {serializeBigInt} from "../../libs/serializeBigInt";

const cardService = new CardService();
export class CardContoller {
    async getCards(req: AuthRequest, res: Response) {
        try {
            const {slug} = req.params;
            console.log(slug);
            const userId = req.user!.id;

            const cards = await cardService.getCards(slug.toString(), userId);

            return res.status(200).json({
                ok: true,
                cards,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                ok: false,
                message: "Ошибка сервера",
            });
        }
    }

    async getAlbums(req: AuthRequest, res: Response){
        console.log("getAlbums");
        try {
            const albums = await cardService.getAlbums();
            return res.status(200).json({
                ok: true,
                albums: serializeBigInt(albums)
            })
        }
        catch (error) {
            console.error(error);
            return res.status(200).json({
                ok: false,
                albums: []
            })
        }
    }

    async addCard(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    ok: false,
                    message: "Не авторизован",
                });
            }

            const cardId = Number(req.body.card_id);

            if (!cardId) {
                return res.status(400).json({
                    ok: false,
                    message: "card_id обязателен",
                });
            }

            const result = await cardService.addCard(
                req.user!.id,
                cardId,
            );

            return res.json({
                ok: true,
                data: result,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                ok: false,
                message: "Ошибка сервера",
            });
        }
    }

    async removeCard(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    ok: false,
                    message: "Не авторизован",
                });
            }

            const cardId = Number(req.body.card_id);

            if (!cardId) {
                return res.status(400).json({
                    ok: false,
                    message: "card_id обязателен",
                });
            }

            const result = await cardService.removeCard(  req.user.id, cardId);

            return res.json({
                ok: result,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                ok: false,
                message: "Ошибка сервера",
            });
        }
    }
}