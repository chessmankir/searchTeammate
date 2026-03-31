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

    useEffect(() => {
        const ac = new AbortController();

        (async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/tournaments",
                    { signal: ac.signal }
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