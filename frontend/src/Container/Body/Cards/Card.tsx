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

export function Card({ card, addCard, removeCard }: CardProps) {
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
            <div className="album-card__image-wrap">
                <img
                    src={"../" + card.imageSrc}
                    alt={card.name}
                    className="album-card__image"
                />

                {totalCount > 0 && (
                    <div className="album-card__total">x{totalCount}</div>
                )}

                <div className="album-card__badges">
                    {commonCount > 0 && (
                        <span className="badge badge-common">x{commonCount}</span>
                    )}
                    {rareCount > 0 && (
                        <span className="badge badge-rare">x{rareCount}</span>
                    )}
                    {legendaryCount > 0 && (
                        <span className="badge badge-legendary">x{legendaryCount}</span>
                    )}
                </div>
            </div>

            <div className="album-card__footer">
                <span className="album-card__title">{card.name}</span>
            </div>

            <div className="album-card__editor">
                <div className="quality-control quality-control--common">
                    <span className="quality-control__label">Обычная</span>
                    <div className="quality-control__actions">
                        <button
                            type="button"
                            className="quality-btn"
                            onClick={(e) => {e.stopPropagation(); removeCard(card.id, QUALITY.COMMON)}}
                            disabled={commonCount <= 0}
                        >
                            −
                        </button>
                        <span className="quality-control__value">{commonCount}</span>
                        <button
                            type="button"
                            className="quality-btn"
                            onClick={(e) => {e.stopPropagation(); addCard(card.id, QUALITY.COMMON)}}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="quality-control quality-control--rare">
                    <span className="quality-control__label">Синяя</span>
                    <div className="quality-control__actions">
                        <button
                            type="button"
                            className="quality-btn"
                            onClick={(e) => {e.stopPropagation(); removeCard(card.id, QUALITY.RARE)}}
                            disabled={rareCount <= 0}
                        >
                            −
                        </button>
                        <span className="quality-control__value">{rareCount}</span>
                        <button
                            type="button"
                            className="quality-btn"
                            onClick={(e) => {e.stopPropagation(); addCard(card.id, QUALITY.RARE)}}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="quality-control quality-control--legendary">
                    <span className="quality-control__label">Золотая</span>
                    <div className="quality-control__actions">
                        <button
                            type="button"
                            className="quality-btn"
                            onClick={(e) => {e.stopPropagation(); removeCard(card.id, QUALITY.LEGENDARY)}}
                            disabled={legendaryCount <= 0}
                        >
                            −
                        </button>
                        <span className="quality-control__value">{legendaryCount}</span>
                        <button
                            type="button"
                            className="quality-btn"
                            onClick={(e) =>{e.stopPropagation(); addCard(card.id, QUALITY.LEGENDARY)}}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}