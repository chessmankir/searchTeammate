type GameModeValue = "classic" | "metro" | "tdm";

type GameModeItem = {
    value: GameModeValue;
    label: string;
};

type MemberType = {
    modes?: GameModeValue[];
};

type Props = {
    member?: MemberType;
    allGameModes: GameModeItem[];
    isEdit: boolean;
    toggleMode: (mode: GameModeValue) => void;
};

export function ProfileGameTags({
                                    member,
                                    allGameModes,
                                    isEdit,
                                    toggleMode,
                                }: Props) {
    return (
        <div className="profile-card">
            <h2 className="profile-card__title">
                Игровые режимы
            </h2>

            <div className="profile-tags">
                {allGameModes.map((mode) => {
                    const active = member?.modes?.includes(mode.value) ?? false;

                    return (
                        <button
                            key={mode.value}
                            disabled={!isEdit}
                            className={
                                active
                                    ? "profile-tag profile-tag--active"
                                    : "profile-tag"
                            }
                            onClick={() => toggleMode(mode.value)}
                        >
                            {mode.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}