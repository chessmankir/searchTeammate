import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import healthRouter from "./routes/health";
import memberRouter from "./routes/member";
import tournamentRouter from "./routes/tournamentRoute";
import clanRoute from "./routes/clanRoute";
import sendCodeRouter from "./routes/sendCodeRouter";
import verifyCodeRouter from "./routes/verifyCodeRouter";
import authMeRouter from "./routes/authMeRouter";
import logoutRouter from "./routes/logoutRouter";
import albumsRouter from "./routes/albumsRouter";
import cardsRouter from "./routes/cardsRoute";
import addCardRouter from "./routes/addCardRouter";
import removeCardRouter from "./routes/removeCardRouter";
import clanMemberRoute from "./routes/clanMemberRoute";
import myClanRoute from "./routes/myClanRoute";
import infoRoute from "./routes/infoRoute";
import conversationRoute from "./routes/Messages/conversationRoute";
import conversationsRoute from "./routes/Messages/conversationsRoute";
import sendMessageRoute from "./routes/Messages/sendMessageRoute";
import getConversationsRoute from "./routes/Messages/getConversationsRoute";
import * as http from "node:http";
import updateMemberRoute from "./routes/updateMemberRoute";
import cardRouter from "./routes/cardRouter";
import getUserCard from "./routes/getUserCard";
import loginAndroidRouter from "./routes/loginAndroidRouter";
import myClanAndroidRoute from "./routes/myClanAndroidRoute";
import clanMemberAndroidRoute from "./routes/clanMemberAndroidRoute";
import cardsAndoid from "./routes/cardsAndoid";
import path from "path";
import addCardAndroidRouter from "./routes/addCardAndroidRouter";
import removeCardAndroidRouter from "./routes/removeCardAndroidRouter";
import getConvarsationAndroidRoute from "./routes/Messages/getConversationAndroidRoute";
import sendMessagesAndroidRouter from "./routes/Messages/sendMessagesAndroidRouter";
import converationAndroidRouter from "./routes/Messages/converationAndroidRouter";
import conversationCreateAndroidRouter from "./routes/Messages/conversationCreateAndroidRouter";
import {pool} from "./db/db";
import setLeader from "./routes/Moderation/setLeader";
import setModerator from "./routes/Moderation/setModerator";
import banUser from "./routes/Moderation/banUser";

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
    console.log("socket connected ", socket.id);

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

app.use("/api/health", healthRouter);
app.use("/api/members", memberRouter);
app.use("/api/tournaments", tournamentRouter);
app.use("/api/clans", clanRoute);
app.use("/api/sendcode", sendCodeRouter);
app.use("/api/verifycode", verifyCodeRouter);
app.use("/api/auth/me", authMeRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/android/cards", cardsAndoid);
app.use("/api/card", cardRouter);
app.use("/api/get/usercard", getUserCard);
app.use("/api/add/card", addCardRouter);
app.use("/api/android/add/card", addCardAndroidRouter);
app.use("/api/remove/card", removeCardRouter);
app.use("/api/android/remove/card", removeCardAndroidRouter);
app.use("/api/clanmember", clanMemberRoute);
app.use("/api/android/clanmember", clanMemberAndroidRoute);
app.use("/api/myclan", myClanRoute);
app.use("/api/android/myclan", myClanAndroidRoute);
app.use("/api/info", infoRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/android/conversation", conversationCreateAndroidRouter);
app.use("/api/conversations", conversationsRoute);
app.use("/api/android/conversations", converationAndroidRouter);
app.use("/api/android/conversations",getConvarsationAndroidRoute)
app.use("/api/conversations", sendMessageRoute);
app.use("/api/conversations/android", sendMessagesAndroidRouter);
app.use("/api/get/conversations", getConversationsRoute);
app.use("/api/update/member", updateMemberRoute);
app.use("/api/android/login", loginAndroidRouter);
app.use("/api/set/leader", setLeader);
app.use("/api/moderation", setModerator);
app.use("/api/ban/user", banUser);


app.get("/api", (req, res) => {
    return res.json({ ok: true, message: "Welcome Backend API" });
});

const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on http://0.0.0.0:${PORT}`);
});