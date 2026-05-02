import type { ClanMember } from "../../../types/ClanMember.ts";

type Props = {
    startConversation: (memberId: number) => void;
    member?: ClanMember;
};

export function ProfileMemberSendMessage({ startConversation, member }: Props) {
    return (
        <button
            className="profile-btn profile-btn--secondary profile-player-card__write"
            onClick={(e) => {
                e.preventDefault();
                console.log('click');
                console.log(member);
                if (!member?.id) return;
                console.log("after");
                startConversation(member.id);
            }}
        >
            Написать
        </button>
    );
}