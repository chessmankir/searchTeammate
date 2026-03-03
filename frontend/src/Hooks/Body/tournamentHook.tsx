import {useState, useEffect} from "react";

type Tournament{

}

export function useTournamentHook(){
    const [tournaments, setTournaments] = useState<Tournament>();
    useEffect(() => {

    }, []);
    return {tournaments};
}