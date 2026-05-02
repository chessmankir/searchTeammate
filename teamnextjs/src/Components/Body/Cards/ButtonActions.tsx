import { ButtonCard } from "./ButtonCard.tsx";
import type {CardType} from "./CardWrapper.tsx";

type ButtonActionsProps = {
    removeCard: (cardId: number) => void;
    addCard: (cardId: number) => void;
    card: CardType;
    totalCount: number;
};

export function ButtonActions({
                                  removeCard,
                                  addCard,
                                  card,
                                  totalCount,
                              }: ButtonActionsProps) {
    return (
        <div className="quality-control__actions">
            <ButtonCard
                text={"-"}
                actionClick={removeCard}
                cardId={card.id}
                totalCount={totalCount}
            />

            <span className="quality-control__value">{totalCount}</span>

            <ButtonCard
                text={"+"}
                actionClick={addCard}
                cardId={card.id}
                totalCount={totalCount}
            />
        </div>
    );
}