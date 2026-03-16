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
    console.log(albumid);
    const cards = useCards(albumid).cards;

    return (
        <div className="album-page">
            <div className="album-page__layout">
                <section className="album-page__content">
                    {/*<div className="album-hero">
                        <div className="album-hero__info">
                            <h1 className="album-hero__title">{selectedAlbum.title}</h1>

                            <div className="album-hero__progress-row">
                <span className="album-hero__progress-text">
                  {selectedAlbum.collected}/{selectedAlbum.total}
                </span>

                                <div className="album-hero__progress-track">
                                    <div
                                        className="album-hero__progress-fill"
                                        style={{
                                            width: `${getProgressPercent(
                                                selectedAlbum.collected,
                                                selectedAlbum.total
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>*/}
                    <div className="album-page__topbar">
                        <div className="album-page__left-meta">
                            <button
                                type="button"
                                className="album-page__back"
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
                           <Card card={card} key={card.id} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}