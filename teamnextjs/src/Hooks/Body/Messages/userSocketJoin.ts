import { useEffect } from "react";
import { socket } from "@/src/Api/socket";

export function useSocketJoin(userId?: number) {
    useEffect(() => {
        if (!userId) return;
        const join = () => {
            socket.emit("join", Number(userId));
        };

        if (socket.connected) {
            join();
        }

        socket.on("connect", join);

        return () => {
            socket.off("connect", join);
        };
    }, [userId]);
}