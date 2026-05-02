import {authStore} from "../../../store/authStore.ts";
import type {ProfileFormState} from "../../../Hooks/Body/Profile/useProfileHooks.ts";
import type {GameMode} from "../../../store/filtersStore.ts";
import {ProfileGameInformation} from "./ProfileGameInformation.tsx";
import {ProfileMainInformation} from "./ProfileMainInformation.tsx";
import {ProfileActionButtons} from "./ProfileActionButtons.tsx";

type ProfileMainCardProps = {
    form: ProfileFormState;
    updateForm: <K extends keyof ProfileFormState>(
        key: K,
        value: ProfileFormState[K]
    ) => void;
    saveCurrentProfile: () => Promise<void>;
    changeGameModeOption: (option: GameMode) => void;
};

export function ProfileMainCard({
                                    form,
                                    updateForm,
                                    saveCurrentProfile,
                                    changeGameModeOption,
                                }: ProfileMainCardProps) {
    const user = authStore((state) => state.user);
    const isMyProfile = user?.id === form.id;

    return (
        <div className="profile-main-card">
            <div className="profile-card">
                <h2 className="profile-card__title">
                    {isMyProfile ? "Редактирование профиля" : "Данные игрока"}
                </h2>

                <ProfileMainInformation
                    isMyProfile={isMyProfile}
                    form={form}
                    updateForm={updateForm}
                />

                <ProfileGameInformation  isMyProfile={isMyProfile}
                                         form={form}
                                         updateForm={updateForm}
                                         changeGameModeOption={changeGameModeOption} />

                {isMyProfile && (
                    <ProfileActionButtons saveProfile={saveCurrentProfile} />
                )}
            </div>
        </div>
    );
}