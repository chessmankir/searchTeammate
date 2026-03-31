import { useEffect, useState } from "react";

export function useMyClanInfoHook() {
    const [allTotal, setAllTotal] = useState(0);
    const [freePlaces, setFreePlaces] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const backend = "http://localhost:4000/api/info";
                const response = await fetch(backend, {
                    credentials: "include"
                });

                const data = await response.json();

                if (data.ok) {
                    setAllTotal(data.total);
                }

                const freePlacesData = await getFreePlaces();
                setFreePlaces(freePlacesData);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return { allTotal, freePlaces };
}

type Clan = {
    member_limit: number | string;
    real_count: number | string;
};

async function getFreePlaces(): Promise<number> {
    try {
        const backend = "http://localhost:4000/api/myclan";
        const response = await fetch(backend, {
            credentials: "include"
        });

        const data = await response.json();

        if (data.ok) {
            const freePlaces = data.clans.reduce(
                (sum: number, clan: Clan) => {
                    return sum + Number(clan.member_limit) - Number(clan.real_count);
                },
                0
            );

            return freePlaces;
        }

        return 0;
    } catch (e) {
        console.log(e);
        return 0;
    }
}