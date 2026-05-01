import { FolderOpen } from "lucide-react";
import { ButtonAlbum } from "./ButtonAlbum.tsx";
import type { AlbumType } from "../../../types/AlbumType.ts";

type ButtonAlbumBlockProps = {
    albums: AlbumType[];
    selectedAlbum: number | null;
    setSelectedAlbum: (id: number | null) => void;
};

export function ButtonAlbumBLock({
                                     albums,
                                     selectedAlbum,
                                     setSelectedAlbum,
                                 }: ButtonAlbumBlockProps) {
    return (
        <div className="cards-filter-block">
            <div className="cards-filter-block__title">
                <FolderOpen size={16} />
                <span>Альбомы</span>
            </div>

            <div className="album-list">
                <ButtonAlbum
                    album={{
                        id: null,
                        name: "Все альбомы",
                        slug: "",
                        imageSrc: "",
                        total_cards: 0,
                    }}
                    key="all"
                    setSelectedAlbum={setSelectedAlbum}
                    selectedAlbum={selectedAlbum}
                />

                {albums.map((album) => (
                    <ButtonAlbum
                        album={album}
                        key={album.id}
                        setSelectedAlbum={setSelectedAlbum}
                        selectedAlbum={selectedAlbum}
                    />
                ))}
            </div>
        </div>
    );
}