import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health";
import memberRouter from "./routes/member";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials:true
    })
);

app.use("/api/health", healthRouter);
app.use("/api/members", memberRouter)

app.get('/api', (req,res) => {
   res.json({ok: true, message: "Welcome Backend API"});
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () =>{
   console.log(`Backend running on http://localhost:${PORT}`);
});