import {useEffect} from "react";
import {socket} from "../../../api/socket.ts";

export function useSocketJoin(userId){
    useEffect(() => {
        if (!userId) return;
        socket.emit("join", userId);
        return () => {

        };
    }, [userId]);
}