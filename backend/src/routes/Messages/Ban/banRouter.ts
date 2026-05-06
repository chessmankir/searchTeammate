import {Router, Request, Response} from "express";
import {pool} from "../../../db/db";
import {io} from "../../../index";

const router = Router();

router.post('/status', async (req: Request, res: Response) => {
    const {user_id, user_ban_id} = req.body;

    const query = `
        SELECT
            EXISTS (
                SELECT 1 FROM user_blocks
                WHERE blocker_id = $1 AND blocked_id = $2
            ) AS "iBlockedHim",
            EXISTS (
                SELECT 1 FROM user_blocks
                WHERE blocker_id = $2 AND blocked_id = $1
            ) AS "heBlockedMe",
            EXISTS (
                SELECT 1 FROM user_blocks
                WHERE  (blocker_id = $1 AND blocked_id = $2) OR
                       (blocker_id = $2 AND blocked_id = $1) 
            ) AS "isBlocked"
    `;
    try{
        const result = await pool.query(query, [user_id, user_ban_id]);
        return res.json({
            ok: true,
            ...result.rows[0]
        })
    }
    catch (er){
        console.log(er);
        return res.status(500).json({
            ok: false
        })
    }
});

router.post("/", async (req: Request, res: Response) => {
    const {user_id, user_ban_id} = req.body;

    if(!user_id || !user_ban_id){
        return res.status(400).json({ok: false, message: "Invalid user"});
    }

    const query = `
        INSERT INTO user_blocks (blocker_id, blocked_id)
         VALUES ($1, $2)
         ON CONFLICT (blocker_id, blocked_id) DO NOTHING
    `;
    try{
        const response = await pool.query(query,[user_id, user_ban_id]);
        io.to(`user:${user_ban_id}`).emit("block:changed", {
           blockerId: user_id,
           blockedId: user_ban_id,
           type: "blocked"
        });
        return res.json({
            ok: true,
            blocked: true
        })
    }
    catch(err){
        res.json({
            ok: false,
        });
        console.log(err);
    }
});

router.delete("/", async (req: Request, res: Response) => {
    const {user_id, user_ban_id} = req.body;

    const query = `
        DELETE FROM user_blocks
        WHERE blocker_id = $1 AND blocked_id = $2
    `;
    try{
        const response = await pool.query(query, [user_id, user_ban_id]);
        io.to(`user:${user_ban_id}`).emit("block:changed", {
            blockerId: user_id,
            blockedId: user_ban_id,
            type: "unblocked"
        });
        return res.json({
            ok: true,
            blocked: false
        })
    }
    catch(err){
        res.json({
            ok: false,
        });
        console.log(err);
    }
    res.json({
        ok: true,
    });
});


export default router;