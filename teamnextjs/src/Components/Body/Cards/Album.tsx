import type { AlbumType } from "@/src/types/AlbumType.ts";
import {useRouter} from "next/navigation";

type AlbumProps = {
    card: AlbumType;
};

export function Album({ card }: AlbumProps) {
    const navigate = useRouter();

    return (
        <button
            className="collect-card"
            type="button"
            onClick={() => {
                if (card.slug) {
                    navigate.push("/cards/" + card.slug);
                } else {
                    navigate.push("/albums");
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