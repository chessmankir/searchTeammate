export interface ClanMember{
    id: number,
    clan_id: number,
    pubg_id: number,
    name: string,
    nickname?: string,
    age?: number,
    city?: string,
    role?: string,
    timeInClan?: string,
    gameMode?: []
}