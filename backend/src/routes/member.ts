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
       const modesRaw = typeof req.query.modes === "string" ? req.query.modes : undefined;
       const ageFrom = req.query.ageFrom ? Number(req.query.ageFrom) : undefined;
       const ageTo = req.query.ageTo ? Number(req.query.ageTo) : undefined;
       
       
       const modes =
           modesRaw && modesRaw.trim().length > 0
               ? modesRaw.split(",").map(s => s.trim()).filter(Boolean)
               : [];

       const where : string[] = [];
       const params: any[] = [];
       let joinSql = "";

       console.log("members route2");
       if(clan_id !== undefined && Number.isFinite(clan_id)){
           params.push(clan_id);
           where.push(`clan_id=$${params.length}`);
       }

       if(number !== undefined && Number.isFinite(number)){
           params.push(number);
           where.push(`number=$${params.length}`);
       }

       if(ageFrom !== undefined && Number.isFinite(ageFrom)){
           params.push(ageFrom);
           where.push(`cm.age >=$${params.length}`);
       }
       if(ageTo !== undefined && Number.isFinite(ageTo)){
           params.push(ageTo);
           where.push(`cm.age <=$${params.length}`);
       }

       if (modes.length > 0) {
           joinSql = `
        JOIN member_modes mm ON cm.id = mm.member_id
        JOIN game_modes gm ON gm.id = mm.mode_id
      `;
           params.push(modes); // text[]
           where.push(`gm.name = ANY($${params.length})`);
       }

        console.log("members route3");
       params.push(limit);
       console.log("members route4");
       const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

       const sql = `
          SELECT DISTINCT cm.*
          FROM clan_members cm
          ${joinSql}
          ${whereSql}
          ORDER BY cm.id DESC
          LIMIT $${params.length}
        `;

       console.log(sql);
       console.log(params);
       const result = await  pool.query<Member>(sql, params);
        console.log(result.rows);
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