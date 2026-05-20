import { Request, Response } from "express";
import { getSession } from "../../../auth/session";
import { io } from "../../../index";
import { messageService } from "./messages.service";
import { serializeBigInt } from "../../../libs/serializeBigInt";
import {AuthRequest} from "../../../middleware/auth.middleware";

export class MessageController {
    async createMessage(req: AuthRequest, res: Response) {
        console.log('createMessage');
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
        console.log('getMessages');
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
}

export const messageController = new MessageController();