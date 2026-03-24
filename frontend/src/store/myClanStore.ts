import {create} from "zustand";
import type {MyClan} from "../types/MyClan.ts";

interface ClanStore{
    clans: MyClan,
    setClans: (clans: MyClan[]) => void,
    setCurrentClan: (clan: number) => void,
    currentClan: number,
    totalMembers: number,
    setTotalMembers: (totalMembers: number) => void,
}

export const myClanStore = create<ClanStore>((set) => ({
    clans: [],
    setClans: ((clans) => set({clans: clans})),
    setCurrentClan: (clan) => set({currentClan: clan}),
    currentClan: 1,
    totalMembers: 0,
    setTotalMembers: (total) => set({totalMembers: total}),
}))