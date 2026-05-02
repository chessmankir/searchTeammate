import type { ClanMember } from "@/src/types/ClanMember.ts";
import {authStore} from "@/src/Store/authStore.ts";
import {ProfileSummary} from "./ProfileSummary.tsx";
import {ProfileMemberCardTop} from "@/src/Components/Body/Profile/ProfileMemberCardTop";
import {ProfileMemberSendMessage} from "@/src/Components/Body/Profile/ProfileMemberSendMessage";

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