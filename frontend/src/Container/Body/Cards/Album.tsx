import { useNavigate } from "react-router-dom";
import type { AlbumType } from "../../../types/AlbumType.ts";

type AlbumProps = {
    card: AlbumType;
};

export function Album({ card }: AlbumProps) {
    const navigate = useNavigate();

    return (
        <button
            className="collect-card"
            type="button"
            onClick={() => {
                if (card.slug) {
                    navigate("/cards/" + card.slug);
                } else {
                    navigate("/albums");
                }
            }}
        >
            <div className="collect-card__image-wrap">
                <img
                    className="collect-card__image"
                    src={card.imageSrc}
                    alt={card.name}
                />
            </div>
            <div className="collect-card__footer">
                <span className="collect-card__title">{card.name}</span>
            </div>
        </button>
    );
}