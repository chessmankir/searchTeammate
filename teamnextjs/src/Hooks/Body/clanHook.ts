"use client";
import {useEffect, useState} from "react";

interface Clan{
    id: number;
    name: string;
    tag: string;
    members_count: number;
    kd: string;
    tagActive?: boolean
}

export function useClans(){
    const [clans, setClans] = useState<Clan[]>([]);
    const error = false;
    const loading  = false;
    useEffect(() => {
        (async () => {
            try {
                const url = process.env.NEXT_PUBLIC_API_URL;
                const clans = await fetch(`${url}/api/clans`);
                const data = await clans.json();
                if(data.ok){
                    setClans(data.data);
                }
            }
            catch (e){
                console.log(e);
            }
        })();
    }, []);
    return {clans, error, loading};
}