import { useState } from "react";
import "@/src/StyleSheets/current_card.css";
import { useCards } from "@/src/Hooks/Body/Card/cardHook.ts";
import type { AlbumFlterType } from "@/src/types/AlbumFlterType.ts";
import {useSearchParams} from "next/navigation";
import {CardType, CardWrapper} from "@/src/Components/Body/Cards/CardWrapper";
import {AlbumPageTopbar} from "@/src/Components/Body/Cards/AlbumPageTopbar";

const validFilters: AlbumFlterType[] = ["all", "duplicates", "missing", "trades"];

export function AllCardsPage() {
    const searchParams = useSearchParams();
    const [, setSelectedCard] = useState<CardType | null>(null);
    const rawFilter = searchParams.get("filter");

    const filter: AlbumFlterType = validFilters.includes(rawFilter as AlbumFlterType)
        ? (rawFilter as AlbumFlterType)
        : "all";

    const { cards, addCardHandler, removeCardHandler } = useCards({ filter });

    return (
        <div className="album-page">
            <div className="album-page__layout">
                <section className="album-page__content">
                    <AlbumPageTopbar />
                    <div className="album-cards-grid">
                        {cards.map((card) => (
                            <CardWrapper
                                key={card.id}
                                card={card}
                                addCard={addCardHandler}
                                removeCard={removeCardHandler}
                                setSelectedCard={setSelectedCard}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}