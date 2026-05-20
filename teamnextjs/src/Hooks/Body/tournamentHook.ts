"use client";

import { useState, useEffect } from "react";

export type Tournament = {
    id: number;
    name: string;
    date: string;
    time: string;
    team_size: number;
    maps: string;
    count: number;
};

export function useTournamentHook() {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const ac = new AbortController();

        (async () => {
            try {
                const url = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(
                    `${url}/api/tournaments`,
                    {
                        signal: ac.signal,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },

                );

                if (!response.ok) {
                    throw new Error("Failed to fetch tournaments");
                }

                const data = await response.json();

                if (data.ok) {
                    setTournaments(data.data as Tournament[]);
                }
            } catch (e) {
                if (e instanceof Error && e.name !== "AbortError") {
                    console.log(e);
                }
            }
        })();

        return () => ac.abort();
    }, []);

    return { tournaments };
}