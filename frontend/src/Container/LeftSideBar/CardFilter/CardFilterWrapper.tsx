import {Logo} from "../Logo.tsx";
import {CardFilters} from "../CardFilter/CardFilters";
import {albumsStore} from "../../../store/albumsStore.ts";
import {profileLinks} from "../../../Data/navItems.ts";
import {ProfileSidebar} from "../Profile/ProfileSidebar.tsx";

export function CardFilterWrapper(){
    const  selectedAlbum = albumsStore((state) => state.selectedAlbum);
    const setSelectedAlbum = albumsStore((state) => state.setSelectedAlbum);
    function setCardFilter() {}
    function onReset() {}
    const albums = albumsStore((state) => state.albums);

    return (
        <div id="left-side-bar1">
            <Logo/>
            <ProfileSidebar navItems={profileLinks} />
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