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
                const clans = await fetch("http://localhost:4000/api/clans");
                const data = await clans.json();
                if(data.ok){
                    setClans(data.data);
                }
                console.log(data);
            }
            catch (e){
                console.log(e);
            }
        })();
    }, []);
    return {clans, error, loading};
}