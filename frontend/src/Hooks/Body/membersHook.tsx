import { useEffect, useMemo, useState } from "react";
import { useFiltersStore } from "../../store/filtersStore.ts";

export function useMembers() {
    const mode = useFiltersStore((s) => s.mode);
    const ageTo = useFiltersStore((s) => s.ageTo);
    const ageFrom = useFiltersStore((s) => s.ageFrom);
    const timeMode = useFiltersStore((s) => s.timeMode);
    const page = useFiltersStore((s) => s.page);

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const query = useMemo(() => {
        const sp = new URLSearchParams();
        if (mode) sp.set("modes", String(mode));
        if (ageFrom != null) sp.set("ageFrom", String(ageFrom));
        if (ageTo != null) sp.set("ageTo", String(ageTo));
        if (timeMode.size > 0) sp.set("timemode", Array.from(timeMode).join(","));
        if (page > 1) sp.set("page", String(page));
        // если добавишь limit — тоже сюда
        return sp.toString();
    }, [mode, ageFrom, ageTo, timeMode, page]);

    useEffect(() => {
        const ac = new AbortController();

        (async () => {
            try {
                setLoading(true);

                const res = await fetch(`http://localhost:4000/api/members?${query}`, {
                    signal: ac.signal,
                });
                console.log(`http://localhost:4000/api/members?${query}`);

                const data = await res.json();

                if (!data.ok) {
                    setError(true);
                    setMembers([]);
                } else {
                    setError(false);
                    setMembers(data.data);
                }
            } catch (e: any) {
                if (e?.name !== "AbortError") {
                    console.error(e);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => ac.abort();
    }, [query]);

    return { members, loading, error };
}