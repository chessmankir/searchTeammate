import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
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
import removeCardRouter from "./routes/addCardRouter";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials:true
    })
);
app.use(express.json());
app.use(cookieParser());

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
app.use("/api/add/card", addCardRouter);
app.use("/api/remove/card", removeCardRouter);

app.get('/api', (req,res) => {
   return res.json({ok: true, message: "Welcome Backend API"});
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () =>{
   console.log(`Backend running on http://localhost:${PORT}`);
});