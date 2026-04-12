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
    addCard: (cardId: number, qualityId: number) => void;
    removeCard: (cardId: number, qualityId: number) => void;
};

/*
const QUALITY = {
    COMMON: 1,
    RARE: 2,
    LEGENDARY: 3,
} as const;
*/

export function CardWrapper({ card, addCard, removeCard, setSelectedCard }: CardProps) {
  /*  const getQualityCount = (qualityId: number) => {
        return card.qualities.find((q) => q.quality_id === qualityId)?.count ?? 0;
    };

    const commonCount = getQualityCount(QUALITY.COMMON);
    const rareCount = getQualityCount(QUALITY.RARE);
    const legendaryCount = getQualityCount(QUALITY.LEGENDARY);*/
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