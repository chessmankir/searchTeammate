import type { ProfileFormState } from "../../../Hooks/Body/Profile/useProfileHooks.ts";

type Props = {
    isMyProfile: boolean;
    form: ProfileFormState;
    updateForm: <K extends keyof ProfileFormState>(
        key: K,
        value: ProfileFormState[K]
    ) => void;
};

export function ProfileMainInformation({ isMyProfile, form, updateForm }: Props) {
    return (
        <div>
            <input
                value={form.nickname}
                onChange={(e) => updateForm("nickname", e.target.value)}
                disabled={!isMyProfile}
            />

            <input
                value={form.age}
                onChange={(e) => updateForm("age", e.target.value)}
                disabled={!isMyProfile}
            />

            <input
                value={form.city}
                onChange={(e) => updateForm("city", e.target.value)}
                disabled={!isMyProfile}
            />

            <input
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                disabled={!isMyProfile}
            />

            <input
                value={form.pubgId}
                onChange={(e) => updateForm("pubgId", e.target.value)}
                disabled={!isMyProfile}
            />
        </div>
    );
}