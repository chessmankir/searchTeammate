type TimeMode = "утро" | "день" | "вечер";

type MemberType = {
    timeModes: TimeMode[];
};

type ProfileTimeTagsProps = {
    allTimeModes: TimeMode[];
    member?: MemberType;
    isEdit: boolean;
    toggleTimeMode: (mode: TimeMode) => void;
};

export function ProfileTimeTags({
                                    allTimeModes,
                                    member,
                                    isEdit,
                                    toggleTimeMode,
                                }: ProfileTimeTagsProps) {
    return (
        <div className="profile-card">
            <h2 className="profile-card__title">
                Когда играешь
            </h2>

            <div className="profile-tags">
                {allTimeModes.map((item) => {
                    const active = member?.timeModes?.includes(item) ?? false;

                    return (
                        <button
                            key={item}
                            disabled={!isEdit}
                            className={
                                active
                                    ? "profile-tag profile-tag--active"
                                    : "profile-tag"
                            }
                            onClick={() => toggleTimeMode(item)}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}