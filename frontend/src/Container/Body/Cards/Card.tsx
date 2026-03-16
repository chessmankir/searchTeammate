export function Card({card}) {
    console.log(card);
    return (
        <button
            key={card.id}
            type="button"
            className={`album-card `}
        >
            <div className="album-card__image-wrap">
                <img
                    src={"../" + card.imageSrc}
                    alt={card.name}
                    className="album-card__image"
                />
            </div>
            <div className="album-card__footer">
                <span className="album-card__title">{card.name}</span>
            </div>
        </button>
    );
}