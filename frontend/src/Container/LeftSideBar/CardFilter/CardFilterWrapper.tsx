import {Logo} from "../Logo.tsx";
import {CardFilters} from "../CardFilter/CardFilters";
import {albumsStore} from "../../../store/albumsStore.ts";

export function CardFilterWrapper(){
    const  selectedAlbum = "all"
    const  cardFilter = "all";
    function setSelectedAlbum() {}
    function setCardFilter() {}
    function onReset() {}
    const albums = albumsStore((state) => state.albums);
    console.log(albums);

    return (
        <div id="left-side-bar">
            <Logo/>
            <CardFilters
                albums= {albums}
                selectedAlbum={selectedAlbum}
                setSelectedAlbum={setSelectedAlbum}
                cardFilter={cardFilter}
                setCardFilter={setCardFilter}
                onReset={onReset}
            />
        </div>
    )
}