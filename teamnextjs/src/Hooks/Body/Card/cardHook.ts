import { useEffect, useState } from "react";
import { authStore } from "../../../store/authStore.ts";
import type { AlbumFlterType } from "../../../types/AlbumFlterType.ts";
import type {CardType} from "../../../Container/Body/Cards/CardWrapper.tsx";

interface UseCardParams {
    albumId?: string;
    filter?: AlbumFlterType;
}

export function useCards({ albumId, filter }: UseCardParams = {}) {
    const user = authStore((state) => state.user);
    const [cards, setCards] = useState<CardType[]>([]);

    const addCardHandler = async (card_id: number) => {
        const url = import.meta.env.VITE_API_URL;
        const backendServer = `${url}/api/add/card`;

        const response = await fetch(backendServer, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                card_id
            })
        });

        if (response.ok) {
            setCards((prev) =>
                prev.map((card) => {
                    if (card.id !== card_id) return card;
                    else{
                        if(card.count > 0){
                            return {...card, count: card.count + 1}
                        }
                        else{
                            return {...card, count: 1}
                        }
                    }
                })
            );
        }
    };

    const removeCardHandler = async (card_id: number) => {
        const url = import.meta.env.VITE_API_URL;
        const backendServer = `${url}/api/remove/card`;

        try {
            const response = await fetch(backendServer, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    card_id
                })
            });

            const data = await response.json();

            if (data.ok) {
                setCards((prev) =>
                    prev.map((card) => {
                        if (card.id !== card_id) return card;
                        return {
                            ...card,
                            count: card.count -1
                        };
                    })
                );
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (!user?.id) return;

        (async () => {
            try {
                const url = import.meta.env.VITE_API_URL;
                let backendURL = `${url}/api/cards`;

                if (albumId) {
                    backendURL += `/${albumId}`;
                }

                const urlParams = new URLSearchParams();

                if (filter) {
                    urlParams.set("filter", filter);
                    backendURL += `?${urlParams.toString()}`;
                }
                console.log(backendURL);
                const response = await fetch(backendURL, {
                    credentials: "include"
                });

                const data = await response.json();
                console.log(data);
                if (data?.ok) {
                    setCards(data.data);
                } else {
                    setCards([]);
                }
            } catch (e) {
                setCards([]);
                console.error(e);
            }
        })();
    }, [albumId, filter, user?.id]);

    return { cards, addCardHandler, removeCardHandler };
}