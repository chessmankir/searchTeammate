import {Router, Request, Response} from "express";
import  {pool} from "../db/db";
import type {Member} from "../../types/ClanMembers";

const router = new Router();

router.get("/", async (req: Request, res: Response) => {
   try{
       console.log("members route");
       const clan_id = req.query.clan_id ? Number(req.query.clan_id) : undefined;
       const number = req.query.number ? Number(req.query.number) : undefined;
       const limit = req.query.limit ? Number(req.query.limit) : 30;

       const where : string[] = [];
       const params: Array<number> = [];
       console.log("members route2");
       if(clan_id !== undefined && Number.isFinite(clan_id)){
           params.push(clan_id);
           where.push(`clan_id=$${params.length}`);
       }

       if(number !== undefined && Number.isFinite(number)){
           params.push(number);
           where.push(`number=$${params.length}`);
       }
       console.log("members route3");
       params.push(limit);
       console.log("members route4");
       const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

       const sql = `
        SELECT *
        FROM clan_members
        ${whereSql}
        ORDER BY id DESC
        LIMIT $${params.length}
      `;

       console.log(sql);
       console.log(params);
       const result = await  pool.query<Member>(sql, params);

       return res.json({
           ok: true,
           data: result.rows,
           count: result.rowCount ?? result.rows.length,
       })

   } catch (e){
       console.error("get clan members",e);
       return res.status(500).json({ok:false, error: "db error"});
   }
});

export default router;