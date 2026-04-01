import { useEffect, useState } from "react";
import { authStore } from "../../store/authStore.ts";
import type { AlbumFlterType } from "../../types/AlbumFlterType.ts";

interface QualityCard {
    quality_id: number;
    count: number;
}

interface Card {
    id: number;
    name: string;
    imageSrc: string;
    qualities: QualityCard[];
}

interface UseCardParams {
    albumId?: string;
    filter?: AlbumFlterType;
}

export function useCards({ albumId, filter }: UseCardParams = {}) {
    const user = authStore((state) => state.user);
    const [cards, setCards] = useState<Card[]>([]);

    const addCardHandler = async (card_id: number, qualityId: number = 1) => {
        const url = import.meta.env.VITE_API_URL;
        const backendServer = `${url}/api/add/card`;

        const response = await fetch(backendServer, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                card_id,
                qualityId
            })
        });

        if (response.ok) {
            setCards((prev) =>
                prev.map((card) => {
                    if (card.id !== card_id) return card;

                    const existing = card.qualities.find(
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
                            ...card.qualities,
                            { quality_id: qualityId, count: 1 },
                        ],
                    };
                })
            );
        }
    };

    const removeCardHandler = async (card_id: number, qualityId: number) => {
        const url = import.meta.env.VITE_API_URL;
        const backendServer = `${url}/api/remove/card`;

        try {
            const response = await fetch(backendServer, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    card_id,
                    qualityId
                })
            });

            const data = await response.json();

            if (data.ok) {
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

                const response = await fetch(backendURL, {
                    credentials: "include"
                });

                const data = await response.json();

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