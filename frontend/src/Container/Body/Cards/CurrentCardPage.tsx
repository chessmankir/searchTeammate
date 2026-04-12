import { useParams } from "react-router-dom";
import "../../../StyleSheets/current_card.css";
import {CardWrapper} from "./CardWrapper.tsx";
import {useCards} from "../../../Hooks/Body/Card/cardHook.ts"
import {AlbumPageTopbar} from "./AlbumPageTopbar.tsx";
import {useCardModal} from "../../../Hooks/Body/Card/useCardModal.ts";
import {CardModal} from "./Modal/CardModal.tsx";

/*function getProgressPercent(collected: number, total: number) {
    if (!total) return 0;
    return Math.round((collected / total) * 100);
}*/

export  function CurrentCardPage() {
    const { albumId } = useParams();
    const {cards, addCardHandler, removeCardHandler} = useCards({albumId});
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