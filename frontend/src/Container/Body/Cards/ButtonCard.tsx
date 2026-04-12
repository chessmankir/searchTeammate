type ButtonCardProps = {
    text: string;
    actionClick: (cardId: number) => void;
    cardId: number;
    quality: number;
    totalCount: number;
};

export function ButtonCard({
                               text,
                               actionClick,
                               cardId,
                               totalCount
                           }: ButtonCardProps) {
    return (
        <button
            type="button"
            className="quality-btn"
            onClick={(e) => {
                e.stopPropagation();
                actionClick(cardId);
            }}
            disabled={totalCount <= 0 && text === "-"}
        >
            {text}
        </button>
    );
}