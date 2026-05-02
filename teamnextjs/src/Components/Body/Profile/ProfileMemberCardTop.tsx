import type { ClanMember } from "../../../types/ClanMember.ts";

type Props = {
    member?: ClanMember;
};

export function ProfileMemberCardTop({ member }: Props) {
    const firstLetter = member?.nickname?.[0]?.toUpperCase() ?? "?";

    return (
    <div className="player-summary__top">
        <div className="player-summary__avatar"> {firstLetter}</div>
        <div className="player-summary__identity">
            <div className="player-summary__nickname"> {member?.nickname ?? "—"}</div>
            <div className="player-summary__pubg">{member?.pubg_id ?? "—"}</div>
        </div>
    </div>
)
    ;
}