import type {CardType} from "./CardWrapper.tsx";

type CardProps = {
    card: CardType;
    setSelectedCard: (card: CardType) => void;
};

export function Card({
                         card, setSelectedCard
                     }: CardProps) {
    const totalCount = card.count == null ? 0 : card.count;
    console.log(card)
    return (
        <div className="album-card__image-wrap">
            <img
                onClick={() => setSelectedCard(card)}
                src={card.imageSrc}
                alt={card.name}
                className="album-card__image"
            />

           {/* {totalCount > 0 && (
                <div className="album-card__total">x{totalCount}</div>
            )}*/}

            <div className="album-card__badges">
                {totalCount > 0 && (
                    <span className="badge badge-common">x{totalCount}</span>
                )}
            </div>
        </div>
    );
}