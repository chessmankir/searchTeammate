import { Router } from "express";
import { updateMemberController } from "./profile.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

/*
router.put(
    "/",
    authMiddleware,
    updateMemberController.updateMember.bind(updateMemberController)
);
*/

router.put(
    "/",
    updateMemberController.updateMember.bind(updateMemberController)
);


export default router;