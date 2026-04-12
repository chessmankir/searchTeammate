import { useNavigate } from "react-router-dom";

type CardModalActionsProps = {
    cardId: number;
    handleTrade: (cardId: number) => void;
};

export function CardModalActions({
                                     cardId,
                                     handleTrade,
                                 }: CardModalActionsProps) {
    const navigate = useNavigate();

    return (
        <div className="card-modal__actions">
            <button
                className="card-modal__button"
                onClick={() => navigate(`/duplicates?cardid=${cardId}`)}
            >
                Найти
            </button>
            <button
                className="card-modal__button"
                onClick={() => handleTrade(cardId)}
            >
                Обмен
            </button>
        </div>
    );
}