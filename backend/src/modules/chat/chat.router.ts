import express, {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {ConversationController} from "./conversations/converstion.controller";
import {MessageController} from "./messages/message.controller";

const router = Router();
const conversationController = new ConversationController();
const messageController = new MessageController();
router.get('/conversations', authMiddleware, conversationController.getConversations.bind(conversationController));
router.get('/conversations/:conversationId', authMiddleware, conversationController.getConversations.bind(conversationController));
router.get('/:conversationId/read', authMiddleware, conversationController.markConversationAsRead.bind(conversationController));

router.get('/:conversation/messages', authMiddleware, messageController.getMessages.bind(conversationController));
router.post('/:conversation/messages', authMiddleware, messageController.createMessage.bind(conversationController));

export default router;