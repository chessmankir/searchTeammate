import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import tournamentRouter from "./routes/tournamentRoute";
import chatRoute from "./modules/chat/chat.router";
import infoRoute from "./routes/infoRoute";
import * as http from "node:http";
import getUserCard from "./routes/getUserCard";
import path from "path";
import {pool} from "./db/db";

import authRouter from "./modules/login/auth.router";
import memberRouter from "./modules/members/members.router";
import clanMemberRoute from "./modules/clanMember/clanMember.router";
import cardRouters from "./modules/cards/card.router";
import moderationRoute from "./modules/moderation/moderation.route";
import updateProfileRouter from "./modules/profile/profile.router";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);


app.use(express.json());
app.use(cookieParser());

app.use("/assets", express.static(path.resolve(process.cwd(), "src/assets")));
app.use("/backend-assets", express.static(path.resolve(__dirname, "../src/assets")));

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: true,
        credentials: true,
    },
});

export const onlineUsers = new Map<number, string>();

io.on("connection", (socket) => {
    socket.on("join", (userId: number) => {
        if (!userId) return;
        onlineUsers.set(userId, socket.id);
        socket.join(`user:${userId}`);
        console.log(`user ${userId} joined room user:${userId}`);
        io.emit("user:online", { userId });
    });

    socket.on("disconnect", async () => {
        const userId = [...onlineUsers.entries()]
            .find(([_, socketId]) => socketId === socket.id)?.[0];

        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }

        await pool.query(
            `UPDATE clan_members SET last_seen_at = NOW() WHERE id = $1`,
            [userId]
        );

        io.emit("user:offline",{
            userId: userId,
            last_seen_at: new Date().toISOString(),
        })
        console.log("socket disconnected", socket.id);
    });
});

app.use("/api/members", memberRouter); //обнова
app.use("/api/tournaments", tournamentRouter);
app.use("/api/auth", authRouter)
app.use("/api/clan", clanMemberRoute);
app.use("/api/card", cardRouters);
app.use("/api/chat", chatRoute);
app.use("/api/moderation/", moderationRoute);
app.use("/api/member/update", updateProfileRouter)

app.use("/api/get/usercard", getUserCard);
app.use("/api/info", infoRoute);

app.get("/api", (req, res) => {
    return res.json({ ok: true, message: "Welcome Backend API" });
});

const PORT = Number(process.env.PORT) || 4001;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on http://0.0.0.0:${PORT}`);
});