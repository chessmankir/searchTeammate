import {FolderOpen} from "lucide-react";
import {ButtonAlbum} from "./ButtonAlbum.tsx";

export function ButtonAlbumBLock({albums, selectedAlbum, setSelectedAlbum}){
    return (
        <div className="cards-filter-block">
            <div className="cards-filter-block__title">
                <FolderOpen size={16}/>
                <span>Альбомы</span>
            </div>

            <div className="album-list">
                <ButtonAlbum  album={{name: "Все альбомы", slug: ""}} key={0} setSelectedAlbum={setSelectedAlbum}
                             selectedAlbum={selectedAlbum}

                />
                {albums.map((album) => (
                    <ButtonAlbum album={album} key={album.id} setSelectedAlbum={setSelectedAlbum}
                                 selectedAlbum={selectedAlbum}/>
                ))}
            </div>
        </div>
    );
}