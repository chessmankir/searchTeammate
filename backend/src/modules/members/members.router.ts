import { Router } from "express";
import {MembersController} from "./members.contoller";

const router = Router();
const memberController = new MembersController();
// Temporary local-development bypass. Restore authMiddleware before deployment.
console.log("router");
router.get("/", memberController.getMembers.bind(memberController));

export default router;
