export function ButtonCard({text, actionClick, cardId, quality, totalCount}){
    return (
        <button
            type="button"
            className="quality-btn"
            onClick={(e) => {
                e.stopPropagation();
                actionClick(cardId, quality)
            }}
            disabled={totalCount <= 0 && text === '-'}
        >
            {text}
        </button>
    )
}
