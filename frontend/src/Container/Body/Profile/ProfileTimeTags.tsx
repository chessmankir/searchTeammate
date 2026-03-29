export function ProfileTimeTags({allTimeModes, member, isEdit, toggleTimeMode}){
    return (
        <div className="profile-card">
            <h2 className="profile-card__title">
                Когда играешь
            </h2>

            <div className="profile-tags">
                {allTimeModes.map((item) => {
                    const active =
                        member?.timeModes.includes(item);

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
    )
}