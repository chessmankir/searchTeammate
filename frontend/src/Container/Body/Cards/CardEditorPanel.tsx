import { ButtonActions } from "./ButtonActions.tsx";
import type {CardType} from "./CardWrapper.tsx";

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
    QUALITY: QualityMap;
};

export function CardEditorPanel({
                                    removeCard,
                                    addCard,
                                    card,
                                }: CardEditorPanelProps) {
    const totalCount = card.count == null ? 0 : card.count;
    return (
        <div className="album-card__editor">
            <div className="quality-control quality-control--common">
                <span className="quality-control__label">Количество</span>
                <ButtonActions
                    card={card}
                    totalCount={totalCount}
                    removeCard={removeCard}
                    addCard={addCard}
                />
            </div>

            {/*<div className="quality-control quality-control--rare">
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
            </div>*/}
        </div>
    );
}