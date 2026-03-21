export function Card({card, totalCount, commonCount, rareCount, legendaryCount}){
    return (
        <div className="album-card__image-wrap">
            <img
                src={"../" + card.imageSrc}
                alt={card.name}
                className="album-card__image"
            />

            {totalCount > 0 && (
                <div className="album-card__total">x{totalCount}</div>
            )}

            <div className="album-card__badges">
                {commonCount > 0 && (
                    <span className="badge badge-common">x{commonCount}</span>
                )}
                {rareCount > 0 && (
                    <span className="badge badge-rare">x{rareCount}</span>
                )}
                {legendaryCount > 0 && (
                    <span className="badge badge-legendary">x{legendaryCount}</span>
                )}
            </div>
        </div>
    );
}