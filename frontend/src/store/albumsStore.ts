import {create} from "zustand";
import type {AlbumType} from "../types/AlbumType.ts";
import type {AlbumFlterType} from "../types/AlbumFlterType.ts";

interface AlbumFilters  {
    albums: AlbumType[],
    setAlbums: (albums: AlbumType[]) => void
    selectedAlbum: string,
    setSelectedAlbum: (selectedAlbum: string) => void,
    selectedCardFilter: AlbumFlterType,
    setSelectedCardFilter: (filter: AlbumFlterType) => void
}

export const albumsStore = create<AlbumFilters>((set) => ({
    albums: [],
    setAlbums: ((albums) =>
        set(() => ({albums: albums})
   )),
    selectedAlbum: "all",
    setSelectedAlbum: ((selectedAlbum) => set({selectedAlbum: selectedAlbum})),
    selectedCardFilter: "all",
    setSelectedCardFilter: (filter: AlbumFlterType) => set({selectedCardFilter: filter}),
}));