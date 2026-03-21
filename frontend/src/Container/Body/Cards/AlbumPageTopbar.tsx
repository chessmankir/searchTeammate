import {useNavigate} from "react-router-dom";

export function AlbumPageTopbar() {
    const navigate = useNavigate();
    return (
        <div className="album-page__topbar">
            <div className="album-page__left-meta">
                <button
                    className="album-page__back"
                    onClick={() => navigate("/cards")}
                >
                    ← Назад к альбомам
                </button>

                <div className="album-page__breadcrumbs">
                    <span>Альбом коллекции карт</span>
                    <span className="album-page__crumb-dot">›</span>
                    {/* <span>{selectedAlbum.title}</span>*/}
                </div>
            </div>
        </div>
    );
}