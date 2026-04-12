import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import "../../../StyleSheets/current_card.css";
import { CardWrapper } from "./CardWrapper.tsx";
import { useCards } from "../../../Hooks/Body/Card/cardHook.ts";
import { AlbumPageTopbar } from "./AlbumPageTopbar.tsx";
import type { AlbumFlterType } from "../../../types/AlbumFlterType.ts";
import type { CardType } from "./CardWrapper.tsx";

const validFilters: AlbumFlterType[] = ["all", "duplicates", "missing", "trades"];

export function AllCardsPage() {
    const [searchParams] = useSearchParams();
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