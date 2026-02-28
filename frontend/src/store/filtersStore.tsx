import { create } from "zustand";

export type GameMode = "classic" | "metro" | "tdm";

type FiltersState = {
    mode: GameMode;
    toggleMode: (mode: GameMode) => void;
    resetModes: () => void;

    ageFrom: number | null;
    ageTo: number | null;
    setAgeFrom: (age:number) => void;
    setAgeTo: (age:number) => void;
};

export const useFiltersStore = create<FiltersState>((set,get) => ({
    mode: "classic",
    ageFrom: 18,
    ageTo: 20,
    setAgeFrom: (age) =>
        set((state) => ({
            ageFrom: age

        })),
    setAgeTo: (age) =>
        set((state) => ({
        ageTo: age

    })),
    toggleMode:(mode) => {
        const current = get().mode;
        set({
            mode: current !== mode ? mode : current
        })
    },
    /*resetModes: () => set({ modes: new Set() }),*/
}));