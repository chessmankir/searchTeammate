import {CardType} from "@/src/Components/Body/Cards/CardWrapper";

type CardDuplicateSelectedCardProps = {
    selectedCard: CardType | null;
};

export function CardDuplicateSelectedCard({selectedCard} : CardDuplicateSelectedCardProps) {
    return (
        <div className="card-duplicates-page__selected-card">
            <img
                src={`/assets/${selectedCard?.imageSrc}`}
                alt={selectedCard?.name}
                className="card-duplicates-page__selected-image"
            />
            <div className="card-duplicates-page__selected-info">
                <div className="card-duplicates-page__selected-name">
                    {selectedCard?.name}
                </div>
                <div className="card-duplicates-page__selected-album">
                    Альбом: {selectedCard?.album_name}
                </div>
            </div>
        </div>
    )
}