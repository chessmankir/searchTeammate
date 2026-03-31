import { create } from "zustand";
import type { AlbumType } from "../types/AlbumType.ts";
import type { AlbumFlterType } from "../types/AlbumFlterType.ts";

interface AlbumFilters {
    albums: AlbumType[];
    setAlbums: (albums: AlbumType[]) => void;
    selectedAlbum: number | null;
    setSelectedAlbum: (selectedAlbum: number | null) => void;
    selectedCardFilter: AlbumFlterType;
    setSelectedCardFilter: (filter: AlbumFlterType) => void;
}

export const albumsStore = create<AlbumFilters>((set) => ({
    albums: [],
    setAlbums: (albums) => set({ albums }),
    selectedAlbum: null,
    setSelectedAlbum: (selectedAlbum) => set({ selectedAlbum }),
    selectedCardFilter: "all",
    setSelectedCardFilter: (filter) => set({ selectedCardFilter: filter }),
}));