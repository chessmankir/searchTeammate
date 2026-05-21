import { Request, Response } from "express";
import {ConversationService} from "./conversation.service";
import {AuthRequest} from "../../../middleware/auth.middleware";
import {serializeBigInt} from "../../../libs/serializeBigInt";

const conversationService = new ConversationService();
export class ConversationController {
    async getConversations(req: AuthRequest, res: Response) {
        try {
            const userId = req.user!.id;
            if (!userId) {
                return res.json({ ok: false });
            }

            const conversations = await conversationService.getConversations(userId);

            return res.json(
                serializeBigInt({
                    ok: true,
                    conversations,
                })
            );
        } catch (err) {
            console.log(err);
            return res.json({ ok: false });
        }
    }

    async getConversationById(req: AuthRequest, res: Response) {
        try {

            const userId = req.user!.id;

            if (userId) {
                return res.status(401).json({
                    ok: false,
                    message: "Не авторизован",
                });
            }

            const currentUserId = Number(userId);
            const conversationId = Number(req.params.conversationId);

            if (!conversationId) {
                return res.status(400).json({
                    ok: false,
                    message: "Некорректный conversationId",
                });
            }

            const conversation =
                await conversationService.getConversationById(
                    currentUserId,
                    conversationId
                );

            if (!conversation) {
                return res.status(404).json({
                    ok: false,
                    message: "Диалог не найден или нет доступа",
                });
            }

            return res.json(
                serializeBigInt({
                    ok: true,
                    data: conversation,
                })
            );
        } catch (e) {
            console.log(e);

            return res.status(500).json({
                ok: false,
                message: "Ошибка сервера",
            });
        }
    }

    async markConversationAsRead(req: AuthRequest, res: Response) {
        try {
            const conversationId = Number(req.params.conversationId);

            if (!conversationId) {
                return res.status(400).json({
                    ok: false,
                    message: "Некорректный conversationId",
                });
            }

            const userId = req.user!.id;

            if (!userId) {
                return res.status(401).json({
                    ok: false,
                    message: "Пользователь не найден",
                });
            }

            await conversationService.markConversationAsRead(
                conversationId,
                Number(userId)
            );

            return res.json({
                ok: true,
            });
        } catch (e) {
            console.log(e);

            return res.status(500).json({
                ok: false,
                message: "Ошибка сервера",
            });
        }
    }
}

export const conversationController = new ConversationController();