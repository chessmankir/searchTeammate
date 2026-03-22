import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import "../../../StyleSheets/current_card.css";
import {CardWrapper} from "./CardWrapper.tsx";
import {useCards} from "../../../Hooks/Body/cardHook.ts"
import {AlbumPageTopbar} from "./AlbumPageTopbar.tsx";
import {albumsStore} from "../../../store/albumsStore.ts";


export function AllCardsPage() {
  //  const {albumid} = useParams();
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter") || "all";
    const {cards, addCardHandler, removeCardHandler} = useCards({filter});

    return (
        <div className="album-page">
            <div className="album-page__layout">
                <section className="album-page__content">
                    <AlbumPageTopbar/>
                    <div className="album-cards-grid">
                        {cards.map((card) => (
                            <CardWrapper card={card} key={card.id} addCard={addCardHandler}
                                         removeCard={removeCardHandler}/>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}