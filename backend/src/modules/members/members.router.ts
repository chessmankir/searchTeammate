import { Router } from "express";
import {MembersController} from "./members.contoller";
import {authMiddleware} from "../../middleware/auth.middleware";

const router = Router();
const memberController = new MembersController();
router.get("/", authMiddleware, memberController.getMembers.bind(memberController));

export default router;