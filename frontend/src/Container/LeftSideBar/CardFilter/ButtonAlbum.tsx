import { useNavigate } from "react-router-dom";
import type { AlbumType } from "../../../types/AlbumType.ts";

type ButtonAlbumProps = {
    album: AlbumType;
    selectedAlbum: number | null;
    setSelectedAlbum: (id: number | null) => void;
};

export function ButtonAlbum({
                                album,
                                selectedAlbum,
                                setSelectedAlbum,
                            }: ButtonAlbumProps) {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setSelectedAlbum(album.id ?? null);

        if (!album.slug) {
            navigate("/albums");
        } else {
            navigate("/cards/" + album.slug);
        }
    };

    return (
        <button
            className={`album-item ${selectedAlbum === (album.id ?? null) ? "active" : ""}`}
            onClick={handleClick}
            type="button"
        >
            <div className="album-item__left">
                <span className="album-dot" />
                <span>{album.name}</span>
            </div>

            {typeof album.total_cards === "number" && (
                <span className="album-count">{album.total_cards}</span>
            )}
        </button>
    );
}