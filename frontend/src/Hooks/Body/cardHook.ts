import {useEffect, useState} from "react";
import {authStore} from "../../store/authStore.ts";
import {cardFiltersStore} from "../../store/cardFiltersStore.ts";

interface qualityCard{
    quality_id: number,
    count: number
}

interface Card  {
    id: number,
    name: string,
    imageSrc: string,
    qualities: qualityCard[]
}

export function useCards(albumid){
    const user = authStore((state)=>state.user);
    const [cards, setCards] = useState<Card[]>([]);
    const selectedAlbum = cardFiltersStore((state) => state.selectedAlbum);
    const typeCards = cardFiltersStore((state) => state.typeCards);

    const addCardHandler = async (card_id, qualityId = 1) => {
        console.log(card_id);
        console.log(qualityId);
        console.log("click");
        const backendServer = "http://localhost:4000/api/add/card";
        const response = await fetch(backendServer,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                card_id: card_id,
                qualityId: qualityId
            })
        });
        if(response.ok){
            console.log("response ok");
            setCards((prev) =>
                prev.map((card) => {
                    if (card.id !== card_id) return card;

                    const existing = card.qualities?.find(
                        (q) => q.quality_id === qualityId
                    );

                    if (existing) {
                        return {
                            ...card,
                            qualities: card.qualities.map((q) =>
                                q.quality_id === qualityId
                                    ? { ...q, count: q.count + 1 }
                                    : q
                            ),
                        };
                    }

                    return {
                        ...card,
                        qualities: [
                            ...(card.qualities || []),
                            { quality_id: qualityId, count: 1 },
                        ],
                    };
                })
            );

        }

    }

    const removeCardHandler =  async (card_id, qualityId) => {
        const backendServer = "http://localhost:4000/api/remove/card";
        try{
            console.log("remove");
            const response = await fetch(backendServer,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    card_id: card_id,
                    qualityId: qualityId
                })
            });
            const data = await response.json();
            if(data.ok){
                console.log("response ok");

               setCards((prev) =>
                    prev.map((card) => {
                        if (card.id !== card_id) return card;

                        return {
                            ...card,
                            qualities: card.qualities
                                .map((q) =>
                                    q.quality_id === qualityId
                                        ? { ...q, count: q.count - 1 }
                                        : q
                                )
                                .filter((q) => q.count > 0)
                        };
                    })
                );
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect( ()=> {
        if(!albumid || !user?.id) return;

        (async () => {
            try{
                console.log(user);
                const backendURL = `http://localhost:4000/api/cards/${albumid}?userid=${user?.id}`;
                const response = await fetch(backendURL);
                const data = await response.json();
                if(data?.ok){
                    setCards(data.data);
                }
                else{
                    setCards([]);
                }
            }
            catch (e){
                setCards([]);
                console.error(e);
            }
        })()
    },[albumid, user?.id]);

    return {cards, addCardHandler, removeCardHandler};
}