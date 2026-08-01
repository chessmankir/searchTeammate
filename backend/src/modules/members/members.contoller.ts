import { Request, Response } from "express";
import { MembersService } from "./members.service";
import {serializeBigInt} from "../../libs/serializeBigInt";

const membersService = new MembersService();

export class MembersController {

    async getMembers(
        req: Request,
        res: Response
    ) {
        console.log("controller");
        try {

            const result =
                await membersService.getMembers({

                    clan_id: req.query.clan_id
                        ? Number(req.query.clan_id)
                        : undefined,

                    number: req.query.number
                        ? Number(req.query.number)
                        : undefined,

                    pubg_id:
                        typeof req.query.pubg_id === "string"
                            ? req.query.pubg_id
                            : undefined,

                    search:
                        typeof req.query.search === "string"
                            ? req.query.search
                            : undefined,

                    status:
                        typeof req.query.status === "string"
                            ? req.query.status
                            : undefined,

                    availableMicro:
                        req.query.availableMicro === "true",

                    ageFrom: req.query.ageFrom
                        ? Number(req.query.ageFrom)
                        : undefined,

                    ageTo: req.query.ageTo
                        ? Number(req.query.ageTo)
                        : undefined,

                    modes:
                        typeof req.query.modes === "string"
                            ? req.query.modes
                                .split(",")
                                .map((item) => item.trim())
                                .filter(Boolean)
                            : [],

                    timeModes:
                        typeof req.query.timemode === "string"
                            ? req.query.timemode
                                .split(",")
                                .map((item) => item.trim())
                                .filter(Boolean)
                            : [],

                    limit: req.query.limit
                        ? Number(req.query.limit)
                        : 30,

                    page: req.query.page
                        ? Number(req.query.page)
                        : 1,
                });

            return res.json(
                serializeBigInt({
                    ok: true,
                    ...result,
                })
            );

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                ok: false,
                message: "Ошибка получения участников",
            });
        }
    }
}