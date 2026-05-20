import express from "express";
import {authMiddleware} from "../../middleware/auth.middleware";
import {CardContoller} from "./card.contoller";

const router = express.Router();
const cardContoller = new CardContoller();
router.get("/cards/:slug", authMiddleware, cardContoller.getCards.bind(cardContoller) );
router.get("/albums", authMiddleware, cardContoller.getAlbums.bind(cardContoller) );
router.post("/add", authMiddleware, cardContoller.addCard.bind(cardContoller) );
router.post("/remove", authMiddleware, cardContoller.removeCard.bind(cardContoller) );

export default router;