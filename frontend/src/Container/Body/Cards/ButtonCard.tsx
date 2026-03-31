type ButtonCardProps = {
    text: string;
    actionClick: (cardId: number, quality: number) => void;
    cardId: number;
    quality: number;
    totalCount: number;
};

export function ButtonCard({
                               text,
                               actionClick,
                               cardId,
                               quality,
                               totalCount
                           }: ButtonCardProps) {
    return (
        <button
            type="button"
            className="quality-btn"
            onClick={(e) => {
                e.stopPropagation();
                actionClick(cardId, quality);
            }}
            disabled={totalCount <= 0 && text === "-"}
        >
            {text}
        </button>
    );
}