import { Response } from "express";
import { getSession } from "../../../auth/session";
import { io } from "../../../index";
import { messageService } from "./messages.service";
import { serializeBigInt } from "../../../libs/serializeBigInt";
import {AuthRequest} from "../../../middleware/auth.middleware";

export class MessageController {
    async createMessage(req: AuthRequest, res: Response) {
        try {
            const { message } = req.body;
            const conversationId = Number(req.params.conversation);

            if (!message) {
                return res.json({
                    ok: false,
                    message: "нет сообщения",
                });
            }

            if (!conversationId) {
                return res.json({
                    ok: false,
                    message: "не найден диалог",
                });
            }

            const user = req.user;

            if (!user?.id) {
                return res.status(401).json({
                    ok: false,
                    error: "Unauthorized",
                });
            }

            const userId = Number(user.id);

            const newMessage = await messageService.createMessage(
                conversationId,
                userId,
                message
            );

            const targetId =
                await messageService.getOtherParticipantId(
                    conversationId,
                    userId
                );

            const messageClient = {
                ...newMessage,
                time: new Date(newMessage.created_at).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            const serializedMessage = serializeBigInt(messageClient);
            io.to(`user:${userId}`).emit("message:new", serializedMessage);

            if (targetId) {
                io.to(`user:${targetId}`).emit("message:new", serializedMessage);
            }

            return res.json({
                ok: true,
                message: serializedMessage,
            });
        } catch (e) {
            console.log(e);

            return res.status(500).json({
                ok: false,
                message: "Ошибка сервера",
            });
        }
    }

    async getMessages(req: AuthRequest, res: Response) {
        try {
            const conversationId = Number(req.params.conversation);

            if (!conversationId) {
                return res.json({
                    ok: false,
                    message: "не найден диалог",
                });
            }

            const user = req.user;

            if (!user?.id) {
                return res.json({
                    ok: false,
                    message: "не авторизован",
                });
            }

            const messages = await messageService.getMessages(conversationId);

            return res.json(
                serializeBigInt({
                    ok: true,
                    messages,
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

    async getStatus(req: AuthRequest, res: Response) {
        try {
            const { user_ban_id } = req.body;
            const user_id = Number(req.user?.id);

            if (!user_id || !user_ban_id) {
                return res.status(400).json({
                    ok: false,
                    message: "Invalid user",
                });
            }

            const status = await messageService.getStatus(
                Number(user_id),
                Number(user_ban_id)
            );

            return res.json({
                ok: true,
                ...status,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false });
        }
    }

    async blockUser(req: AuthRequest, res: Response) {
        try {
            const { user_ban_id } = req.body;
            const user_id = Number(req.user?.id);
            if (!user_id || !user_ban_id) {
                return res.status(400).json({
                    ok: false,
                    message: "Invalid user",
                });
            }

            const result = await messageService.blockUser(
                Number(user_id),
                Number(user_ban_id)
            );

            return res.json({
                ok: true,
                ...result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false });
        }
    }

    async unblockUser(req: AuthRequest, res: Response) {
        try {
            const { user_ban_id } = req.body;
            const user_id = Number(req.user?.id);

            if (!user_id || !user_ban_id) {
                return res.status(400).json({
                    ok: false,
                    message: "Invalid user",
                });
            }

            const result = await messageService.unblockUser(
                Number(user_id),
                Number(user_ban_id)
            );

            return res.json({
                ok: true,
                ...result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false });
        }
    }
}

export const messageController = new MessageController();
