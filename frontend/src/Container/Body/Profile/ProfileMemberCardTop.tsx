import type { ClanMember } from "../../../types/ClanMember.ts";

type Props = {
    member?: ClanMember;
};

export function ProfileMemberCardTop({ member }: Props) {
    const firstLetter = member?.nickname?.[0]?.toUpperCase() ?? "?";

    return (
        <div className="profile-player-card__top">
            <div className="profile-player-card__avatar">
                {firstLetter}
            </div>

            <div className="profile-player-card__identity">
                <div className="profile-player-card__nickname">
                    {member?.nickname ?? "—"}
                </div>
                <div className="profile-player-card__pubg">
                    PUBG ID: {member?.pubg_id ?? "—"}
                </div>
            </div>
        </div>
    );
}