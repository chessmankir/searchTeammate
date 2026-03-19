import { useNavigate, useParams } from "react-router-dom";
import "../../../StyleSheets/current_card.css";
import {Card} from "./Card.tsx";
import {useCards} from "../../../Hooks/Body/cardHook.ts"

function getProgressPercent(collected: number, total: number) {
    if (!total) return 0;
    return Math.round((collected / total) * 100);
}

export  function CurrentCardPage() {
   // const navigate = useNavigate();
    const { albumid } = useParams();
    const {cards, addCardHandler, removeCardHandler} = useCards(albumid);
    const navigate = useNavigate();

    return (
        <div className="album-page">
            <div className="album-page__layout">
                <section className="album-page__content">
                    <div className="album-page__topbar">
                        <div className="album-page__left-meta">
                            <button
                                className="album-page__back"
                                onClick={() => {navigate("/cards");}}
                            >
                                ← Назад к альбомам
                            </button>

                            <div className="album-page__breadcrumbs">
                                <span>Альбом коллекции карт</span>
                                <span className="album-page__crumb-dot">›</span>
                               {/* <span>{selectedAlbum.title}</span>*/}
                            </div>
                        </div>
                    </div>
                    <div className="album-cards-grid">
                        {cards.map((card) => (
                           <Card card={card} key={card.id} addCard={addCardHandler} removeCard={removeCardHandler}/>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}