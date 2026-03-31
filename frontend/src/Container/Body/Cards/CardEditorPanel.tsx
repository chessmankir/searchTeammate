import { ButtonActions } from "./ButtonActions.tsx";

type CardType = {
    id: number;
    name: string;
    imageSrc: string;
};

type QualityMap = {
    COMMON: number;
    RARE: number;
    LEGENDARY: number;
};

type CardEditorPanelProps = {
    removeCard: (cardId: number, quality: number) => void;
    addCard: (cardId: number, quality: number) => void;
    card: CardType;
    commonCount: number;
    rareCount: number;
    legendaryCount: number;
    QUALITY: QualityMap;
};

export function CardEditorPanel({
                                    removeCard,
                                    addCard,
                                    card,
                                    commonCount,
                                    rareCount,
                                    legendaryCount,
                                    QUALITY
                                }: CardEditorPanelProps) {
    return (
        <div className="album-card__editor">
            <div className="quality-control quality-control--common">
                <span className="quality-control__label">Обычная</span>
                <ButtonActions
                    card={card}
                    removeCard={removeCard}
                    totalCount={commonCount}
                    addCard={addCard}
                    quality={QUALITY.COMMON}
                />
            </div>

            <div className="quality-control quality-control--rare">
                <span className="quality-control__label">Синяя</span>
                <ButtonActions
                    card={card}
                    removeCard={removeCard}
                    totalCount={rareCount}
                    addCard={addCard}
                    quality={QUALITY.RARE}
                />
            </div>

            <div className="quality-control quality-control--legendary">
                <span className="quality-control__label">Золотая</span>
                <ButtonActions
                    card={card}
                    removeCard={removeCard}
                    totalCount={legendaryCount}
                    addCard={addCard}
                    quality={QUALITY.LEGENDARY}
                />
            </div>
        </div>
    );
}