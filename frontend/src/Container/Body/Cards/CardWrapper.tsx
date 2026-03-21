import {CardEditorPanel} from "./CardEditorPanel.tsx";
import {Card} from "./Card.tsx";

type Quality = {
    quality_id: number;
    count: number;
};

type CardType = {
    id: number;
    name: string;
    imageSrc: string;
    qualities: Quality[];
};

type CardProps = {
    card: CardType;
    addCard: (cardId: number, qualityId: number) => void;
    removeCard: (cardId: number, qualityId: number) => void;
};

const QUALITY = {
    COMMON: 1,
    RARE: 2,
    LEGENDARY: 3,
} as const;

export function CardWrapper({ card, addCard, removeCard }: CardProps) {
    const getQualityCount = (qualityId: number) => {
        return card.qualities.find((q) => q.quality_id === qualityId)?.count ?? 0;
    };

    const commonCount = getQualityCount(QUALITY.COMMON);
    const rareCount = getQualityCount(QUALITY.RARE);
    const legendaryCount = getQualityCount(QUALITY.LEGENDARY);

    const totalCount = commonCount + rareCount + legendaryCount;
    const isOwned = totalCount > 0;

    return (
        <div className={isOwned ? "album-card owned" : "album-card missing"}>
            <Card card={card} totalCount={totalCount} rareCount={rareCount} commonCount={commonCount} legendaryCount={legendaryCount} />

            <div className="album-card__footer">
                <span className="album-card__title">{card.name}</span>
            </div>

            <CardEditorPanel card={card} addCard={addCard} removeCard={removeCard}
                     rareCount={rareCount} commonCount={commonCount} legendaryCount={legendaryCount} QUALITY={QUALITY}/>
        </div>
    );
}