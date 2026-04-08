import type { ClanMember } from "../../../types/ClanMember.ts";
import { ProfileMemberCardTop } from "./ProfileMemberCardTop.tsx";
import { ProfileMemberSendMessage } from "./ProfileMemberSendMessage.tsx";
import {authStore} from "../../../store/authStore.ts";
import {ProfileSummary} from "./ProfileSummary.tsx";

type Props = {
    member?: ClanMember;
    startConversation: (memberId: number) => void | Promise<boolean>;
};

export function ProfileMember({ member, startConversation }: Props) {
    const user = authStore((state) => state.user);
    const isMyProfile = user?.id == member?.id;
    return (
    <div className="profile-sidebar-card">
        <div className="profile-card">
            <h2 className="profile-card__title">Профиль игрока</h2>

            <div className="player-summary">
                <ProfileMemberCardTop member={member}/>
                {!isMyProfile && (
                    <ProfileMemberSendMessage
                        startConversation={startConversation}
                        member={member}
                    />)}
                 <ProfileSummary />
            </div>
        </div>
    </div>
)
    ;

}