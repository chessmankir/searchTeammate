import {Album} from "./Album.tsx";
import type {AlbumType} from "../../../types/AlbumType.ts";

type AlbumsProps = {
    albums: AlbumType[];
};

export function Albums({albums}: AlbumsProps) {
    return (
        <div className="cards-layout">
            <section className="album-main">
                <div className="album-main__topbar">
                    <div className="album-main__breadcrumbs">
                        <span>Альбомы</span>
                        {/*    <span className="divider">›</span>*/}
                    </div>
                </div>

                <div className="cards-grid">
                    {albums.map((card) => (
                        <Album card={card} key={card.id ?? card.slug ?? card.name} />
                    ))}
                </div>
            </section>

        </div>
    )
}