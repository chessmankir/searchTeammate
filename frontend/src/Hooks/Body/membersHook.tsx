import { useEffect, useMemo, useState } from "react";
import {TimeMode, useFiltersStore} from "../../store/filtersStore";

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
        if (mode) {
            sp.set("modes", mode);
        }
        if(ageFrom){
            sp.set("ageFrom", ageFrom);
        }
        if(ageTo){
            sp.set("ageTo", ageTo);
        }
        if(timeMode.size > 0){
            sp.set("timemode", Array.from(timeMode).join(","));
        }
        if(page > 1){
            sp.set("page",page);
        }
        return sp.toString();
    }, [mode, ageFrom, ageTo, timeMode, page]);

    useEffect(() => {
        async function fetchMembers() {
            console.log("fetch");
            setLoading(true);
            const res = await fetch(`http://localhost:4000/api/members?${query}`);
            const data = await res.json();
            console.log(data);
            if(data.ok == false){
                setError(true);
                setMembers([]);
            }
            else{
                setError(false);
                setMembers(data.data);
            }
            setLoading(false);

        }
        fetchMembers();
    }, [query]);

    return { members, loading };
}