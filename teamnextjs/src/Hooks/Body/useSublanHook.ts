"use client";

import { useEffect, useRef} from "react";
import {myClanStore} from "@/src/Store/myClanStore";

export function useSubclans() {
    /*const clans = myClanStore((state) => state.clans);*/
    const setClans = myClanStore((state) => state.setClans);
    const requestedRef = useRef(false);

    useEffect(() => {
        if (requestedRef.current) return;
        requestedRef.current = true;
        const token = localStorage.getItem("token");
        (async () => {
            try {
                const url = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${url}/api/clan/clans`, {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data.ok) {
                    setClans(data.clans ?? []);
                }
            } catch (e) {
                console.log("useSubclans error:", e);
            }
        })();
    }, [setClans]);
}