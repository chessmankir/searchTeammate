import {CardEditorPanel} from "./CardEditorPanel.tsx";
import {Card} from "./Card.tsx";

export type CardType = {
    id: number;
    name: string;
    imageSrc: string;
    album_id: number;
    quality: string;
    count: number;
    album_name?: string;
};

type CardProps = {
    card: CardType;
    addCard: (cardId: number) => void;
    removeCard: (cardId: number) => void;
    setSelectedCard: (card: CardType) => void;
};

export function CardWrapper({ card, addCard, removeCard, setSelectedCard }: CardProps) {
    const totalCount = card.count == null ? 0 : card.count;
    const isOwned = totalCount > 0;

    return (
        <div className={isOwned ? "album-card owned" : "album-card missing"}>
            <Card card={card} setSelectedCard={setSelectedCard} />
            <div className="album-card__footer">
                <span className="album-card__title">{card.name}</span>
            </div>
            <CardEditorPanel card={card} addCard={addCard} removeCard={removeCard} />
        </div>
    );
}