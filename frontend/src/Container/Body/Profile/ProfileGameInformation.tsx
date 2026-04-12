import type { ProfileFormState } from "../../../Hooks/Body/Profile/useProfileHooks.ts";
import type { GameMode } from "../../../store/filtersStore.ts";

type ProfileGameInformationProps = {
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
                                       }: ProfileGameInformationProps) {
    return (
        <div className="profile-section">
            <div className="profile-section__title">Игровая информация</div>

            <div className="profile-form-grid">
                <div className="profile-field profile-field--full">
                    <span>Режимы</span>
                    <div className="profile-modes">
                        <button
                            onClick={() => changeGameModeOption("classic")}
                            className={
                                form.modes?.includes("classic")
                                    ? "profile-mode-chip is-active"
                                    : "profile-mode-chip"
                            }
                            type="button"
                            disabled={!isMyProfile}
                        >
                            Классика
                        </button>

                        <button
                            onClick={() => changeGameModeOption("metro")}
                            className={
                                form.modes?.includes("metro")
                                    ? "profile-mode-chip is-active"
                                    : "profile-mode-chip"
                            }
                            type="button"
                            disabled={!isMyProfile}
                        >
                            Metro
                        </button>

                        <button
                            onClick={() => changeGameModeOption("tdm")}
                            className={
                                form.modes?.includes("tdm")
                                    ? "profile-mode-chip is-active"
                                    : "profile-mode-chip"
                            }
                            type="button"
                            disabled={!isMyProfile}
                        >
                            TDM
                        </button>

                        <button
                            onClick={() => changeGameModeOption("ultimate")}
                            className={
                                form.modes?.includes("ultimate")
                                    ? "profile-mode-chip is-active"
                                    : "profile-mode-chip"
                            }
                            type="button"
                            disabled={!isMyProfile}
                        >
                            Ultimate Royale
                        </button>
                    </div>
                </div>

                <label className="profile-field">
                    <span>Статус</span>
                    <select
                        disabled={!isMyProfile}
                        value={form.status_game}
                        onChange={(e) =>
                            updateForm("status_game", e.target.value as ProfileFormState["status_game"])
                        }
                    >
                        <option value="all">Любой</option>
                        <option value="as">Продвижение Ас</option>
                        <option value="asm">Продвижение Ас-мастер</option>
                        <option value="asd">Продвижение Ас-доминатора</option>
                        <option value="zavic">Апаю завика</option>
                        <option value="legend">Апаю Легенду</option>
                    </select>
                </label>

                <label className="profile-field">
                    <span>Микрофон</span>
                    <label className="profile-check">
                        <input
                            type="checkbox"
                            checked={form.availableMicro}
                            onChange={(e) =>
                                updateForm("availableMicro", e.target.checked)
                            }
                            disabled={!isMyProfile}
                        />
                        <span>Есть микрофон</span>
                    </label>
                </label>
            </div>
        </div>
    );
}