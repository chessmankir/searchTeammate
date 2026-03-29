import {useEffect, useState} from "react";

export function useMyClanInfoHook (){
    const [allTotal, setAllTotal] = useState(0);
    const [freePlaces, setFreePlaces] = useState(0);

    useEffect(() => {
        (async ()=> {
            const backend = "http://localhost:4000/api/info";
            const response = await fetch(backend,{
                credentials: "include"
            });
            const data = await response.json();
            if (data.ok){
                setAllTotal(data.total);
            }
            const freePlacesData = await getFreePlaces();
            setFreePlaces(freePlacesData);
        })();
    }, []);
    return {allTotal, freePlaces}
}

async function getFreePlaces() {
    const backend = "http://localhost:4000/api/myclan";
    const response = await fetch(backend,{
        credentials: "include"
    });
    const data = await response.json();
    if (data.ok){
        const freePlaces = data.clans.reduce((sum, clan) => {
            return sum + (Number(clan.member_limit)) - (Number(clan.real_count))
        },0);
        return freePlaces;
    }
    return "";
}