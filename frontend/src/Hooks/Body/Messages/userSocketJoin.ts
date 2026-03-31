import { useEffect } from "react";
import { socket } from "../../../api/socket.ts";

export function useSocketJoin(userId?: number) {
    useEffect(() => {
        if (!userId) return;

        socket.emit("join", userId);

        return () => {
        };
    }, [userId]);
}