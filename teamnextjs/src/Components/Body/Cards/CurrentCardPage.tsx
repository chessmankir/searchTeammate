"use client";

import "@/src/StyleSheets/current_card.css";
import "@/src/StyleSheets/Card.css";
import {useCards} from "@/src/Hooks/Body/Card/cardHook.ts"
import {useCardModal} from "@/src/Hooks/Body/Card/useCardModal.ts";
import {useParams} from "next/navigation";
import {AlbumPageTopbar} from "@/src/Components/Body/Cards/AlbumPageTopbar";
import {CardWrapper} from "@/src/Components/Body/Cards/CardWrapper";
import {CardModal} from "@/src/Components/Body/Cards/Modal/CardModal";

/*function getProgressPercent(collected: number, total: number) {
    if (!total) return 0;
    return Math.round((collected / total) * 100);
}*/

export  function CurrentCardPage() {
    const { slug  } = useParams();
    const {cards, addCardHandler, removeCardHandler} = useCards({slug });
    const { selectedCard, setSelectedCard, closeCardModal, handleTrade} = useCardModal();
    return (
        <div className="album-page">
            <div className="album-page__layout">
                <section className="album-page__content">
                    <AlbumPageTopbar />
                    <div className="album-cards-grid">
                        {cards.map((card) => (
                           <CardWrapper card={card}  key={card.id} addCard={addCardHandler}
                                        removeCard={removeCardHandler} setSelectedCard={setSelectedCard}/>
                        ))}
                    </div>
                    {selectedCard && (
                        <CardModal selectedCard={selectedCard} closeCardModal={closeCardModal}
                                   handleTrade={handleTrade}  />
                    )}

                </section>
            </div>
        </div>
    );
}