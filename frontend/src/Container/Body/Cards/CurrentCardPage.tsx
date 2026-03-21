import { useNavigate, useParams } from "react-router-dom";
import "../../../StyleSheets/current_card.css";
import {CardWrapper} from "./CardWrapper.tsx";
import {useCards} from "../../../Hooks/Body/cardHook.ts"
import {AlbumPageTopbar} from "./AlbumPageTopbar.tsx";

function getProgressPercent(collected: number, total: number) {
    if (!total) return 0;
    return Math.round((collected / total) * 100);
}

export  function CurrentCardPage() {
    const { albumid } = useParams();
    const {cards, addCardHandler, removeCardHandler} = useCards(albumid);

    return (
        <div className="album-page">
            <div className="album-page__layout">
                <section className="album-page__content">
                    <AlbumPageTopbar />
                    <div className="album-cards-grid">
                        {cards.map((card) => (
                           <CardWrapper card={card} key={card.id} addCard={addCardHandler} removeCard={removeCardHandler}/>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}