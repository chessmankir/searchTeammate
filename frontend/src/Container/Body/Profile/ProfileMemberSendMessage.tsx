import {useNavigate} from "react-router-dom";

export function ProfileMemberSendMessage({startConversation, member}){
    console.log('ProfileMemberSendMessage');
    return (
        <button className="profile-btn profile-btn--secondary profile-player-card__write"
                onClick={(e) => {
                    e.preventDefault();
                    startConversation(member.id);
                }
        }
        >
            Написать
        </button>
    );
}