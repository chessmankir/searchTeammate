import {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {ModerationController} from "./moderation.contoller";

const router = Router();
const moderationController = new ModerationController();
/*router.post("/set", authMiddleware, moderationController.setModeration.bind(moderationController) );
router.post("/remove", authMiddleware, moderationController.removeModeration.bind(moderationController) );
router.post("/leader", authMiddleware, moderationController.setLeadership.bind(moderationController) );*/
router.post("/set", moderationController.setModeration.bind(moderationController) );
router.post("/remove", moderationController.removeModeration.bind(moderationController) );
router.post("/leader", moderationController.setLeadership.bind(moderationController) );
export default router;