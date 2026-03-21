import {useNavigate} from "react-router-dom";

export function ButtonAlbum({album, selectedAlbum, setSelectedAlbum}){
    const navigate = useNavigate();
    return (
        <button
            key={album.id ?? "all"}
            className={`album-item ${selectedAlbum === album.id ? "active" : ""}`}
            onClick={(e) =>{
                e.preventDefault();
                setSelectedAlbum(album.id);
                navigate("/cards/" + album.slug);
            }}
            type="button"
        >
            <div className="album-item__left">
                <span className="album-dot"/>
                <span>{album.name}</span>
            </div>

            {typeof album.total_cards === "number" && (
                <span className="album-count">{album.total_cards}</span>
            )}
        </button>
    )
}