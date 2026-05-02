import type { ProfileFormState } from "../../../Hooks/Body/Profile/useProfileHooks.ts";

type ProfileMainInformationProps = {
    isMyProfile: boolean;
    form: ProfileFormState;
    updateForm: <K extends keyof ProfileFormState>(
        key: K,
        value: ProfileFormState[K]
    ) => void;
};

export function ProfileMainInformation({
                                           isMyProfile,
                                           form,
                                           updateForm,
                                       }: ProfileMainInformationProps) {
    return (
        <div className="profile-section">
            <div className="profile-section__title">Основная информация</div>

            <div className="profile-form-grid">
                <label className="profile-field">
                    <span>Ник</span>
                    <input
                        type="text"
                        value={form.nickname}
                        onChange={(e) => updateForm("nickname", e.target.value)}
                        disabled={!isMyProfile}
                    />
                </label>

                <label className="profile-field">
                    <span>PUBG ID</span>
                    <input
                        type="text"
                        value={form.pubgId}
                        onChange={(e) => updateForm("pubgId", e.target.value)}
                        disabled={!isMyProfile}
                    />
                </label>

                <label className="profile-field">
                    <span>Имя</span>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateForm("name", e.target.value)}
                        disabled={!isMyProfile}
                    />
                </label>

                <label className="profile-field">
                    <span>Возраст</span>
                    <input
                        type="number"
                        value={form.age}
                        onChange={(e) => updateForm("age", e.target.value)}
                        disabled={!isMyProfile}
                    />
                </label>

                <label className="profile-field profile-field--full">
                    <span>Город</span>
                    <input
                        type="text"
                        value={form.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                        disabled={!isMyProfile}
                    />
                </label>
            </div>
        </div>
    );
}