import "../../../StyleSheets/Card.css";
import { useCards } from "../../../Hooks/Body/Card/cardHook.ts";

type AlbumType = {
    id: number;
    name: string;
};

type CardAlbumsProps = {
    selectedAlbum: AlbumType | null;
};

export function CardAlbums({ selectedAlbum }: CardAlbumsProps) {
    const { cards } = useCards();

    if (!selectedAlbum) {
        return (
            <div className="albums-grid">
                {cards.map((card) => (
                    <div key={card.id} className="album-card">
                        <img src={card.imageSrc} alt={card.name} />
                        <div className="album-name">{card.name}</div>
                    </div>
                ))}
            </div>
        );
    }

    return <div>нет такого альбома</div>;
}