import {useEffect, useState} from "react";
import {redux} from "zustand/middleware/redux";

interface Card  {
    id: number,
    name: string,
    imageSrc: string
}

export function useCards(albumid){
    console.log(albumid);
    const [cards, setCards] = useState<Card[]>([]);

    useEffect( ()=> {
        if(!albumid) return;

        (async () => {
            try{
                const backendURL = `http://localhost:4000/api/cards/${albumid}`;
                const response = await fetch(backendURL);
                const data = await response.json();
                console.log(data);
                if(data?.ok){
                    setCards([]);
                }
                console.log(data.data);
                setCards(data.data);
            }
            catch (e){
                setCards([]);
                console.error(e);
            }
        })()
    },[albumid]);

    return {cards};
}