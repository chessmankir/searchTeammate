import type { ProfileFormState } from "../../../Hooks/Body/Profile/useProfileHooks.ts";
import type { GameMode } from "../../../store/filtersStore.ts";

type Props = {
    isMyProfile: boolean;
    form: ProfileFormState;
    updateForm: <K extends keyof ProfileFormState>(
        key: K,
        value: ProfileFormState[K]
    ) => void;
    changeGameModeOption: (option: GameMode) => void;
};

export function ProfileGameInformation({
                                           isMyProfile,
                                           form,
                                           updateForm,
                                           changeGameModeOption,
                                       }: Props) {
    return (
        <div>
            <input
                type="checkbox"
                checked={form.availableMicro}
                onChange={(e) =>
                    updateForm("availableMicro", e.target.checked)
                }
                disabled={!isMyProfile}
            />

            {/* пример переключения режимов */}
            <button onClick={() => changeGameModeOption("classic")}>
                Classic
            </button>
        </div>
    );
}