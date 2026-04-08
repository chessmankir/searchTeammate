import {authStore} from "../../../store/authStore.ts";
import {ProfileActionButtons} from "../../../Hooks/Body/ProfileActionButtons.tsx";
import {ProfileMainInformation} from "../../../Hooks/Body/ProfileMainInformation.tsx";
import {ProfileGameInforamtion} from "../../../Hooks/Body/ProfileGameInforamtion.tsx";

export function ProfileMainCard({id, member, nickname, age, city, name, pubgId, setNickname, setPubgId, setName, setAge, setCity,
                                    availableMicro, setAvailableMicro, modes, setModes, status_game, setStatus_game, saveProfile, changeGameModeOption}) {
    const user = authStore((state) => state.user);
    const isMyProfile = user?.id == id;
    return (
        <div className="profile-main-card">
            <div className="profile-card">
                {isMyProfile && (<h2 className="profile-card__title">Редактирование профиля</h2>)}
                {!isMyProfile && (<h2 className="profile-card__title">Данные игрока</h2>)}
                <ProfileMainInformation  isMyProfile={isMyProfile}  age={age} nickname={nickname} city={city} name={name} pubgId={pubgId}
                                         setNickname={setNickname} setPubgId={setPubgId} setName={setName} setAge={setAge} setCity={setCity} />
                <ProfileGameInforamtion changeGameModeOption={changeGameModeOption} isMyProfile={isMyProfile} availableMicro={availableMicro} setAvailableMicro={setAvailableMicro} modes={modes} setModes={setModes}
                                        status_game={status_game} setStatus_game={setStatus_game} />
                {isMyProfile && (<ProfileActionButtons saveProfile={saveProfile} age={age} nickname={nickname} modes={modes}
                                                       status_game={status_game}  city={city} name={name} pubgId={pubgId} id={id} availableMicro={availableMicro}  />)}
            </div>
        </div>
    )
}