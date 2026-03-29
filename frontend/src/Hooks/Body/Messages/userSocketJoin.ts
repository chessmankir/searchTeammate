import {useEffect} from "react";
import {socket} from "../../../api/socket.ts";

export function userSocketJoin(userId){
    useEffect(() => {
        if (!userId) return;
        socket.emit("join", userId);
        return () => {

        };
    }, [userId]);
}