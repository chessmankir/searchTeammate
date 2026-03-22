import "../../../StyleSheets/Card.css.css";
import {useCards} from "../../../Hooks/Body/cardHook.ts"

export function CardAlbums({selectedAlbum}) {
   const cards = useCards().cards;
   if (!selectedAlbum) {
        return (
            <div className="albums-grid">
                {cards.map(card => (
                    <div key={card.id} className="album-card" >
                        <img src={card.imageSrc} alt={card.name} />
                        <div className="album-name">{card.name}</div>
                     {/* {/!*  <div className="album-progress">{album.progress}</div>*!/}*/}
                    </div>
                ))}
            </div>
        );
    }

    return <div>нет такого альбома</div>

   /* return (
        <div className="album-detail">
            <button onClick={() => setSelectedAlbum(null)}>← Назад к альбомам</button>
            <h2>{selectedAlbum.name}</h2>
            <div className="cards-grid">
                {selectedAlbum.cards.map(card => (
                    <div
                        key={card.id}
                        className={`card ${card.owned ? "owned" : ""}`}
                        onClick={() => {
                            card.owned = !card.owned; // для прототипа
                            setSelectedAlbum({ ...selectedAlbum });
                        }}
                    >
                        <img src={card.image} alt={card.name} />
                        <div className="card-name">{card.name}</div>
                        {card.owned && <div className="owned-badge">✔</div>}
                    </div>
                ))}
            </div>
        </div>
    );*/
}