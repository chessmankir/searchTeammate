import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    return res.json({ ok: true, status: "healthy", time: new Date().toISOString() });
});

export default router;
