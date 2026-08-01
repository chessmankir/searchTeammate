import express from "express";
import {ClanMemberController} from "./clanMember.controller";
import {authMiddleware} from "../../middleware/auth.middleware";

console.log("route");
const router = express.Router();
const clanMemberController = new ClanMemberController();
/*router.get("/member", authMiddleware, clanMemberController.getClanMembers.bind(clanMemberController));
router.get("/clans", authMiddleware, clanMemberController.getClans.bind(clanMemberController));*/
router.get("/member", clanMemberController.getClanMembers.bind(clanMemberController));
router.get("/clans", clanMemberController.getClans.bind(clanMemberController));
export default router;