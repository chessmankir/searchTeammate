export type ClanMember = {
    id: number;
    nickname: string | null;
    username: string | null;
    pubg_id: string | null;
    clan_id?: number;
    number?: number;
};

export async function fetchClanMembers(
    params?: { clan_id?: number; number?: number; limit?: number }
): Promise<ClanMember[]> {
    const qs = new URLSearchParams();
    console.log(params);
    if (params?.clan_id != null) qs.set("clan_id", String(params.clan_id));
    if (params?.number != null) qs.set("number", String(params.number));
    if (params?.limit != null) qs.set("limit", String(params.limit));

    const response = await fetch(`http://localhost:4000/api/members?${qs.toString()}`, {
        credentials: "include",
    });
    console.log(response);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json.data ?? [];
}

