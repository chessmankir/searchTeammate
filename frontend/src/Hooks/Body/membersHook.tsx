import { useEffect, useMemo, useState } from "react";
import { useFiltersStore } from "../../store/filtersStore";

export function useMembers() {
    const mode = useFiltersStore((s) => s.mode);
    const ageTo = useFiltersStore((s) => s.ageTo);
    const ageFrom = useFiltersStore((s) => s.ageFrom);

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    const query = useMemo(() => {
        const sp = new URLSearchParams();
        if (mode) {
            sp.set("modes", mode);
        }
        if(ageFrom){
            sp.set("ageFrom", ageFrom);
        }
        if(ageTo){
            sp.set("ageTo", ageTo);
        }
        return sp.toString();
    }, [mode, ageFrom, ageTo]);

    useEffect(() => {
        async function fetchMembers() {
            console.log("fetch");
            setLoading(true);
            const res = await fetch(`http://localhost:4000/api/members?${query}`);
            const data = await res.json();
            console.log(data);
            setMembers(data.data);
            setLoading(false);
        }

        fetchMembers();
    }, [query]);

    return { members, loading };
}