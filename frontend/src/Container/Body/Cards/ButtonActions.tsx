import { ButtonCard } from "./ButtonCard.tsx";

type ButtonActionsProps = {
    removeCard: (cardId: number, quality: number) => void;
    addCard: (cardId: number, quality: number) => void;
    card: {
        id: number;
    };
    totalCount: number;
    quality: number;
};

export function ButtonActions({
                                  removeCard,
                                  addCard,
                                  card,
                                  totalCount,
                                  quality
                              }: ButtonActionsProps) {
    return (
        <div className="quality-control__actions">
            <ButtonCard
                text={"-"}
                actionClick={removeCard}
                cardId={card.id}
                quality={quality}
                totalCount={totalCount}
            />

            <span className="quality-control__value">{totalCount}</span>

            <ButtonCard
                text={"+"}
                actionClick={addCard}
                cardId={card.id}
                quality={quality}
                totalCount={totalCount}
            />
        </div>
    );
}