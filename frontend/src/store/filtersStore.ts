import { create } from "zustand";

export type GameMode = "classic" | "metro" | "tdm";
export type TimeMode = "morning" | "day" | "evening";

type FiltersState = {
    mode: GameMode;
    toggleMode: (mode: GameMode) => void;
    resetModes: () => void;

    ageFrom: number | null;
    ageTo: number | null;
    setAgeFrom: (age:number) => void;
    setAgeTo: (age:number) => void;

    timeMode: Set<TimeMode>;
    toggleTimeMode: (mode: TimeMode) => void;
    resetTimeMode: () => void;

    page: number;
    setPage: (page) => void;
};

export const useFiltersStore = create<FiltersState>((set,get) => ({
    mode: "classic",
    ageFrom: 18,
    ageTo: 40,
    page: 1,
    timeMode: new Set(),
    setAgeFrom: (age) =>
        set((state) => ({
            ageFrom: age
        })),
    setAgeTo: (age) =>
        set((state) => ({
        ageTo: age

    })),
    toggleTimeMode: (mode) =>
        set((state) =>{
            console.log('state');
            const next = new Set(state.timeMode);
            if(next.has(mode)){
               next.delete(mode);
            }
            else{
                next.add(mode);
            }
            return {timeMode: next, page: 1};

    }),
    toggleMode:(mode) => {
        const current = get().mode;

        set({
            mode: current !== mode ? mode : current,
            page: 1
        })
    },
    /*setPage: (page) => {
        console.log("page:", page);
        set({page: page});
    }*/

    setPage: (page) => {
        set((state) => {
            return {page};
        })
    }

    /*resetModes: () => set({ modes: new Set() }),*/
}));

