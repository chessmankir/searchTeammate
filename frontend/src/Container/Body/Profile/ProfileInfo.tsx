export function ProfileInfo({member}){
    return (
        <div className="profile-card">
            <h2 className="profile-card__title">
                Основная информация
            </h2>

            <div className="profile-form-grid">
                <label className="profile-field">
                    <span>Ник</span>
                    <input
                        value={member?.nickname}
                    />
                </label>

                <label className="profile-field">
                    <span>PUBG ID</span>
                    <input
                        value={member?.pubg_id}

                    />
                </label>

                <label className="profile-field">
                    <span>Имя</span>
                    <input
                        value={member?.name}

                    />
                </label>

                <label className="profile-field">
                    <span>Возраст</span>
                    <input
                        type="number"
                        value={member?.age ?? ""}
                    />
                </label>

                <label className="profile-field profile-field--full">
                    <span>Город</span>
                    <input
                        value={member?.city}
                    />
                </label>
            </div>
        </div>
    )
}