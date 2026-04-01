import { useEffect, useMemo, useState } from "react";
import { useFiltersStore } from "../../store/filtersStore.ts";

type Member = {
    id: number;
    name: string;
    nickname: string;
    pubg_id?: number | string;
    age?: number;
    city?: string;
};

export function useMembers() {
    const mode = useFiltersStore((s) => s.mode);
    const ageTo = useFiltersStore((s) => s.ageTo);
    const ageFrom = useFiltersStore((s) => s.ageFrom);
    const timeMode = useFiltersStore((s) => s.timeMode);
    const page = useFiltersStore((s) => s.page);

    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);

    const query = useMemo(() => {
        const sp = new URLSearchParams();
        if (mode) sp.set("modes", String(mode));
        if (ageFrom != null) sp.set("ageFrom", String(ageFrom));
        if (ageTo != null) sp.set("ageTo", String(ageTo));
        if (timeMode.size > 0) sp.set("timemode", Array.from(timeMode).join(","));
        if (page > 1) sp.set("page", String(page));
        return sp.toString();
    }, [mode, ageFrom, ageTo, timeMode, page]);

    useEffect(() => {
        const ac = new AbortController();

        (async () => {
            try {
                setLoading(true);
                const backend = import.meta.env.VITE_API_URL;
                const res = await fetch(`${backend}/api/members?${query}`, {
                    signal: ac.signal,
                });

                const data = await res.json();

                if (!data.ok) {
                    setError("Не удалось загрузить игроков");
                    setMembers([]);
                } else {
                    setError(false);
                    setMembers(data.data);
                }
            } catch (e: any) {
                if (e?.name !== "AbortError") {
                    console.error(e);
                    setError("Не удалось загрузить игроков");
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => ac.abort();
    }, [query]);

    return { members, loading, error };
}