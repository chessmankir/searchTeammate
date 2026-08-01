"use client";

import { useEffect, useState } from "react";
import { authStore } from "@/src/Store/authStore";
import type { AlbumFlterType } from "@/src/types/AlbumFlterType.ts";
import type {CardType} from "@/src/Components/Body/Cards/CardWrapper.tsx";

interface UseCardParams {
    slug?: string;
    filter?: AlbumFlterType;
}

export function useCards({ slug, filter }: UseCardParams = {}) {
    const user = authStore((state) => state.user);
    const [cards, setCards] = useState<CardType[]>([]);

    const addCardHandler = async (card_id: number) => {
        const url = process.env.NEXT_PUBLIC_API_URL;
        const backendServer = `${url}/api/card/add`;
        const token = localStorage.getItem("token");
        const response = await fetch(backendServer, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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
        const url = process.env.NEXT_PUBLIC_API_URL;
        const backendServer = `${url}/api/card/remove`;
        const token = localStorage.getItem("token");
        try {

            const response = await fetch(backendServer, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    card_id
                }),
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
                const token = localStorage.getItem("token");
                const url = process.env.NEXT_PUBLIC_API_URL;
                let backendURL = `${url}/api/card/cards`;

                if (slug) {
                    backendURL += `/${slug}`;
                }

                const urlParams = new URLSearchParams();

                if (filter) {
                    urlParams.set("filter", filter);
                    backendURL += `?${urlParams.toString()}`;
                }
                const response = await fetch(backendURL, {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (data?.ok) {
                    setCards(data.cards);
                } else {
                    setCards([]);
                }
            } catch (e) {
                setCards([]);
                console.error(e);
            }
        })();
    }, [slug, filter, user?.id]);

    return { cards, addCardHandler, removeCardHandler };
}