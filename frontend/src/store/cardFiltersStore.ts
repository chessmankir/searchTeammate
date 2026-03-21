import {create} from "zustand";

type TypeCards = "all" | "dublicate" | "none" | "trade";

interface cardFilters{
    selectedAlbum: string,
    typeCards: TypeCards
}

export const  cardFiltersStore = create<cardFilters>((set,get) => ({
    selectedAlbum: "all",
    typeCards: "all",

    setSelectedAlbum: (id) => set({selectedAlbum: id}),
    setTypeCards: (id) => set({typeCards: id})
}));