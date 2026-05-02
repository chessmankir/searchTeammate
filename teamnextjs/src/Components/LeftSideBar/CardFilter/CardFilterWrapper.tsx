"use client";
import { CardFilters } from "../CardFilter/CardFilters";
import { albumsStore } from "@/src/Store/albumsStore.ts";
import { profileLinks } from "@/src/Data/navItems.ts";
import {ProfileSidebar} from "@/src/Components/LeftSideBar/Profile/ProfileSidebar";
import {Logo} from "@/src/Components/LeftSideBar/Logo";

export function CardFilterWrapper() {
    const selectedAlbum = albumsStore((state) => state.selectedAlbum);
    const setSelectedAlbum = albumsStore((state) => state.setSelectedAlbum);
    const albums = albumsStore((state) => state.albums);

    function setCardFilter() {}
    function onReset() {}

    return (
        <div id="left-side-bar1">
            <Logo />
            <ProfileSidebar navItems={profileLinks} />
            <CardFilters
                albums={albums}
                selectedAlbum={selectedAlbum}
                setSelectedAlbum={setSelectedAlbum}
                setCardFilter={setCardFilter}
                onReset={onReset}
            />
        </div>
    );
}