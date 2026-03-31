import type { ClanMember } from "../../../types/ClanMember.ts";
import { ProfileMemberCardStats } from "./ProfileMemberCardStats.tsx";
import { ProfileMemberCardTop } from "./ProfileMemberCardTop.tsx";
import { ProfileMemberSendMessage } from "./ProfileMemberSendMessage.tsx";

type Props = {
    member?: ClanMember;
    startConversation: (memberId: number) => void | Promise<boolean>;
};

export function ProfileMember({ member, startConversation }: Props) {
    return (
        <div className="profile-card">
            <h2 className="profile-card__title">Профиль игрока</h2>
            <div className="profile-player-card">
                <ProfileMemberCardTop member={member} />
                <ProfileMemberSendMessage
                    startConversation={startConversation}
                    member={member}
                />
                <ProfileMemberCardStats />
            </div>
        </div>
    );
}