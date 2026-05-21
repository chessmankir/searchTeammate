import { useEffect } from "react";
//import { socket } from "../../../api/socket";
import {socket} from "@/src/Api/socket";

export function useSocketJoin(userId?: number) {
    useEffect(() => {
        if (!userId) return;

        socket.emit("join", userId);

        return () => {
        };
    }, [userId]);
}