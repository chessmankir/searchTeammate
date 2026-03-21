import {create} from "zustand";
import type {AlbumType} from "../types/AlbumType.ts";

interface AlbumFilters  {
    albums: AlbumType[],
    setAlbums: (albums: AlbumType[]) => void
}

export const albumsStore = create<AlbumFilters>((set, get) => ({
    albums: [],
    setAlbums: ((albums) =>
        set((prev) => ({albums: albums})
   ))
}));