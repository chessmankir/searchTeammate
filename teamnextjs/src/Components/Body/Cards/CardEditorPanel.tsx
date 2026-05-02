import { ButtonActions } from "./ButtonActions.tsx";
import type {CardType} from "./CardWrapper.tsx";

type CardEditorPanelProps = {
    removeCard: (cardId: number) => void;
    addCard: (cardId: number) => void;
    card: CardType;
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
        </div>
    );
}