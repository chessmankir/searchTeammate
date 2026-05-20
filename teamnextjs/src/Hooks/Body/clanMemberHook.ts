"use client";

import { useEffect, useState } from "react";
import type { ClanMember } from "@/src/types/ClanMember.ts";
import { myClanStore } from "@/src/Store/myClanStore";
import {useSearchParams} from "next/navigation";

export function useClanMember() {
    const [clanMembers, setClanMembers] = useState<ClanMember[]>([]);
    const searchParams = useSearchParams();
    const setCurrentClan = myClanStore((state) => state.setCurrentClan);
    const setTotalMembers = myClanStore((state) => state.setTotalMembers);
    const number = Number(searchParams.get("number")) || 1;
    const [searchData, setSearchData] = useState<string>("");


    useEffect(() => {
        setCurrentClan(number);
        const token = localStorage.getItem("token");
        (async () => {
            try {
                const query = new URLSearchParams();

                if (searchData !== "") {
                    query.set("search", searchData);
                } else {
                    query.set("number", String(number));
                }
                const url = process.env.NEXT_PUBLIC_API_URL;
                console.log(token);
                const response = await fetch(
                    `${url}/api/clan/member?${query.toString()}`,
                    {
                        credentials: "include",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                console.log(data);
                if (data.ok) {
                    const members = data.clanMembers ?? [];
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