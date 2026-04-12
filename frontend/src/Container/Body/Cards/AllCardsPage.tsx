import { useSearchParams } from "react-router-dom";
import "../../../StyleSheets/current_card.css";
import { CardWrapper } from "./CardWrapper.tsx";
import { useCards } from "../../../Hooks/Body/Card/cardHook.ts";
import { AlbumPageTopbar } from "./AlbumPageTopbar.tsx";
import type { AlbumFlterType } from "../../../types/AlbumFlterType.ts";

const validFilters: AlbumFlterType[] = ["all", "duplicates", "missing", "trades"];

export function AllCardsPage() {
    const [searchParams] = useSearchParams();
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
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}