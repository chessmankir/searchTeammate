import { useEffect, useRef} from "react";
import {myClanStore} from "@/src/Store/myClanStore.ts";


export function useSubclans() {
    /*const clans = myClanStore((state) => state.clans);*/
    const setClans = myClanStore((state) => state.setClans);
    const requestedRef = useRef(false);

    useEffect(() => {
        if (requestedRef.current) return;
        requestedRef.current = true;

        (async () => {
            try {
                const url = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${url}/api/myclan`, {
                    credentials: "include"
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