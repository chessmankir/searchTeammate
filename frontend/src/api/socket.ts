import {io} from 'socket.io-client';
const url = import.meta.env.VITE_API_URL || undefined;
export const socket = io(`${url}`,{
    withCredentials: true,
    autoConnect: true
});

/*
export const socket = io({
    path: "/socket.io",
    withCredentials: true,
    autoConnect: true,
    transports: ["websocket", "polling"],
});*/
