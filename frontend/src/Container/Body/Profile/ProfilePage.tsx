import "../../../StyleSheets/profile.css";
import {ProfileMember} from "./ProfileMember.tsx";
import {useProfileHooks} from "../../../Hooks/Body/Profile/useProfileHooks.ts";
import {useStartConversation} from "../../../Hooks/Body/Profile/useStartConversation.ts";
import {ProfileMainCard} from "./ProfileMainCard.tsx";

export default function ProfilePage() {
    const {member, nickname, age, city, name, pubgId,
        setNickname, setPubgId, setName, setAge, setCity, id, changeGameModeOption,
        availableMicro, setAvailableMicro, modes, setModes, status_game, setStatus_game, saveProfile} = useProfileHooks();
    const {startConversation} = useStartConversation();
    return (
        <section className="profile-page">
            <div className="profile-content">
                <div className="profile-layout">
                    <ProfileMember startConversation={startConversation} member={member}/>
                   <ProfileMainCard changeGameModeOption={changeGameModeOption} saveProfile={saveProfile} id={id} setNickname={setNickname} setPubgId={setPubgId} setName={setName} setAge={setAge} setCity={setCity}
                    age={age} nickname={nickname} city={city} name={name} pubgId={pubgId}
                    availableMicro={availableMicro} setAvailableMicro={setAvailableMicro} modes={modes} setModes={setModes}
                    status_game={status_game} setStatus_game={setStatus_game}/>
                </div>
            </div>
        </section>
    );
}

