import { useEffect, useState } from "react";
import type { ClanMember } from "../../../types/ClanMember.ts";
import { useParams } from "react-router-dom";

export function useProfileHooks() {
    const [member, setMember] = useState<ClanMember>();
    const { pubg_id } = useParams();

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams();

            if (pubg_id) {
                params.set("pubg_id", pubg_id);
            } else {
                params.set("pubg_id", "1");
            }

            const backend = "http://localhost:4000/api/members?" + params.toString();

            try {
                const response = await fetch(backend, {
                    credentials: "include",
                });

                const data = await response.json();

                if (data.ok) {
                    if (pubg_id) {
                        setMember({ ...data.data[0], owner: false });
                    } else {
                        setMember({ ...data.data[0], owner: true });
                    }
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [pubg_id]);

    return { member };
}