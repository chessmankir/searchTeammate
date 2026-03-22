import {Logo} from "../Logo.tsx";
import {CardFilters} from "../CardFilter/CardFilters";
import {albumsStore} from "../../../store/albumsStore.ts";

export function CardFilterWrapper(){
    const  selectedAlbum = albumsStore((state) => state.selectedAlbum);
    const setSelectedAlbum = albumsStore((state) => state.setSelectedAlbum);
    function setCardFilter() {}
    function onReset() {}
    const albums = albumsStore((state) => state.albums);

    return (
        <div id="left-side-bar">
            <Logo/>
            <CardFilters
                albums= {albums}
                selectedAlbum={selectedAlbum}
                setSelectedAlbum={setSelectedAlbum}
                setCardFilter={setCardFilter}
                onReset={onReset}
            />
        </div>
    )
}