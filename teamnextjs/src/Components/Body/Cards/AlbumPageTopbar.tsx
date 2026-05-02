import {useRouter} from "next/navigation";

export function AlbumPageTopbar() {
    const navigate = useRouter();
    return (
        <div className="album-page__topbar">
            <div className="album-page__left-meta">
                <button
                    className="album-page__back"
                    onClick={() => navigate.push("/albums")}
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