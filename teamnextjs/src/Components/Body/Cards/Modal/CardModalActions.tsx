import {useRouter} from "next/navigation";

type CardModalActionsProps = {
    cardId: number;
    handleTrade: (cardId: number) => void;
};

export function CardModalActions({
                                     cardId,
                                     handleTrade,
                                 }: CardModalActionsProps) {
    const navigate = useRouter();

    return (
        <div className="card-modal__actions">
            <button
                className="card-modal__button"
                onClick={() => navigate.push(`/duplicates?cardid=${cardId}`)}
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