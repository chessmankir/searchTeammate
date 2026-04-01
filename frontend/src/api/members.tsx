export type ClanMember = {
    id: number;
    actor_id: number;
    name: string | null;
    nickname: string | null;
    pubg_id: string | null;
    clan_id?: number;
    age?: string;
    city?: number;
    mode?: string;
};

export async function fetchClanMembers(
    params?: { clan_id?: number; number?: number; limit?: number, modes?: string[] }
): Promise<ClanMember[]> {
    const qs = new URLSearchParams();
    if (params?.clan_id != null) qs.set("clan_id", String(params.clan_id));
    if (params?.number != null) qs.set("number", String(params.number));
    if (params?.limit != null) qs.set("limit", String(params.limit));
    if (params?.modes && params.modes.length > 0) {
        qs.set("modes", params.modes.join(",")); // classic,metro
    }
    const url = import.meta.env.VITE_API_URL;
    const response = await fetch(`${url}/api/members?${qs.toString()}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const json = await response.json();
    return json.data ?? [];
}

