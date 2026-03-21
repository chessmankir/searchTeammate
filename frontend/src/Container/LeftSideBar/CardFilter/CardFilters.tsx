import "../../../StyleSheets/CardFilter.css";

import "../../../StyleSheets/CardFilter.css";
import { FolderOpen, Filter, RotateCcw } from "lucide-react";

type Album = {
    id: number | null;
    name: string;
    count?: number;
};

type CardFilterType = "all" | "duplicates" | "missing" | "trades";

type Props = {
    albums: Album[];
    selectedAlbum: number | null;
    setSelectedAlbum: (id: number | null) => void;
    cardFilter: CardFilterType;
    setCardFilter: (value: CardFilterType) => void;
    onReset: () => void;
};

export function CardFilters({
                                albums,
                                selectedAlbum,
                                setSelectedAlbum,
                                cardFilter,
                                setCardFilter,
                                onReset,
                            }: Props) {
    return (
        <aside className="cards-sidebar">
            <div className="cards-sidebar__glow" />

            <div className="cards-sidebar__header">
                <div className="cards-sidebar__icon">
                    <Filter size={18} />
                </div>

                <div>
                    <h3>Фильтры</h3>
                </div>
            </div>

            <div className="cards-filter-block">
                <div className="cards-filter-block__title">
                    <FolderOpen size={16} />
                    <span>Альбомы</span>
                </div>

                <div className="album-list">
                    <button
                        className={`album-item ${selectedAlbum === null ? "active" : ""}`}
                        onClick={() => setSelectedAlbum(null)}
                        type="button"
                    >
                        <div className="album-item__left">
                            <span className="album-dot" />
                            <span>Все альбомы</span>
                        </div>
                    </button>

                    {albums.map((album) => (
                        <button
                            key={album.id ?? "all"}
                            className={`album-item ${selectedAlbum === album.id ? "active" : ""}`}
                            onClick={() => setSelectedAlbum(album.id)}
                            type="button"
                        >
                            <div className="album-item__left">
                                <span className="album-dot" />
                                <span>{album.name}</span>
                            </div>

                            {typeof album.count === "number" && (
                                <span className="album-count">{album.count}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="cards-filter-block">
                <div className="cards-filter-block__title">
                    <span>Тип карточек</span>
                </div>

                <div className="filter-chips">
                    <button
                        className={`filter-chip ${cardFilter === "all" ? "active" : ""}`}
                        onClick={() => setCardFilter("all")}
                        type="button"
                    >
                        Все
                    </button>

                    <button
                        className={`filter-chip ${cardFilter === "duplicates" ? "active" : ""}`}
                        onClick={() => setCardFilter("duplicates")}
                        type="button"
                    >
                        Дубликаты
                    </button>

                    <button
                        className={`filter-chip ${cardFilter === "missing" ? "active" : ""}`}
                        onClick={() => setCardFilter("missing")}
                        type="button"
                    >
                        Отсутствуют
                    </button>

                    <button
                        className={`filter-chip ${cardFilter === "trades" ? "active" : ""}`}
                        onClick={() => setCardFilter("trades")}
                        type="button"
                    >
                        Обмены
                    </button>
                </div>
            </div>

            <div className="cards-sidebar__footer">
                <button className="reset-btn" onClick={onReset} type="button">
                    <RotateCcw size={16} />
                    <span>Сбросить фильтры</span>
                </button>
            </div>
        </aside>
    );
}