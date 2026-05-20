import {AuthController} from "./auth.controller";
import {Router} from "express";
import {authMiddleware} from "../../middleware/auth.middleware";

const router = Router();
const authContoller = new AuthController();

router.post("/sendcode", authContoller.requestCode.bind(authContoller));
router.post("/verify", authContoller.verifyCode.bind(authContoller));
router.get("/me", authMiddleware, authContoller.autme.bind(authContoller));

export default router;