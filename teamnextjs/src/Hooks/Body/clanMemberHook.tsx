import { useEffect, useState } from "react";
import type { ClanMember } from "@/src/types/ClanMember.ts";
import { myClanStore } from "@/src/Store/myClanStore.ts";
import {useSearchParams} from "next/navigation";

export function useClanMember() {
    const [clanMembers, setClanMembers] = useState<ClanMember[]>([]);
    const [searchParams] = useSearchParams();
    const setCurrentClan = myClanStore((state) => state.setCurrentClan);
    const setTotalMembers = myClanStore((state) => state.setTotalMembers);
    const number = Number(searchParams.get("number")) || 1;
    const [searchData, setSearchData] = useState<string>("");

    useEffect(() => {
        setCurrentClan(number);

        (async () => {
            try {
                const query = new URLSearchParams();

                if (searchData !== "") {
                    query.set("search", searchData);
                } else {
                    query.set("number", String(number));
                }
                const url = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(
                    `${url}/api/clanmember?${query.toString()}`,
                    {
                        credentials: "include"
                    }
                );

                const data = await response.json();

                if (data.ok) {
                    const members = data.members ?? [];
                    setClanMembers(members);
                    setTotalMembers(members.length);
                }
            } catch (e) {
                console.log("useClanMember error:", e);
            }
        })();
    }, [number, setCurrentClan, searchData, setTotalMembers]);

    return { clanMembers, setClanMembers, number, searchData, setSearchData };
}