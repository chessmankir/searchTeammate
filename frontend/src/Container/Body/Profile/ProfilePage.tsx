import "../../../StyleSheets/profile.css";
import {ProfileInfo} from "./ProfileInfo.tsx";
import {ProfileMember} from "./ProfileMember.tsx";
import {useProfileHooks} from "../../../Hooks/Body/Profile/useProfileHooks.ts";
import {useStartConversation} from "../../../Hooks/Body/Profile/useStartConversation.ts";

export default function ProfilePage() {
    const {member} = useProfileHooks();
    const {startConversation} = useStartConversation();
    return (
        <section className="profile-page">
            <div className="profile-content">
                test
               {/* <div className="profile-header-card">
                    <div className="profile-header-card__left">
                        <div className="profile-avatar">
                            {member.nickname[0].toUpperCase()}
                        </div>

                        <div>
                            <h1 className="profile-title">{member.nickname}</h1>
                            <p className="profile-subtitle">
                                PUBG ID: {draft.pubg_id}
                            </p>
                        </div>
                    </div>

                    <div className="profile-header-card__actions">
                        {!isEdit ? (
                            <button
                                className="profile-btn profile-btn--primary"
                                onClick={startEdit}
                            >
                                Редактировать
                            </button>
                        ) : (
                            <>
                                <button
                                    className="profile-btn profile-btn--ghost"
                                    onClick={cancelEdit}
                                >
                                    Отмена
                                </button>

                                <button
                                    className="profile-btn profile-btn--primary"
                                    onClick={saveProfile}
                                    disabled={!hasChanges}
                                >
                                    Сохранить
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="profile-grid">
                     ОСНОВНАЯ ИНФА
                    <div className="profile-card">
                        <h2 className="profile-card__title">
                            Основная информация
                        </h2>

                        <div className="profile-form-grid">
                            <label className="profile-field">
                                <span>Ник</span>
                                <input
                                    value={draft.nickname}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        updateField("nickname", e.target.value)
                                    }
                                />
                            </label>

                            <label className="profile-field">
                                <span>PUBG ID</span>
                                <input
                                    value={draft.pubg_id}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        updateField("pubg_id", e.target.value)
                                    }
                                />
                            </label>

                            <label className="profile-field">
                                <span>Имя</span>
                                <input
                                    value={draft.name}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        updateField("name", e.target.value)
                                    }
                                />
                            </label>

                            <label className="profile-field">
                                <span>Возраст</span>
                                <input
                                    type="number"
                                    value={draft.age ?? ""}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        updateField(
                                            "age",
                                            e.target.value
                                                ? Number(e.target.value)
                                                : null
                                        )
                                    }
                                />
                            </label>

                            <label className="profile-field profile-field--full">
                                <span>Город</span>
                                <input
                                    value={draft.city}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        updateField("city", e.target.value)
                                    }
                                />
                            </label>
                        </div>
                    </div>

                     О СЕБЕ
                    <div className="profile-card">
                        <h2 className="profile-card__title">О себе</h2>

                        <textarea
                            rows={6}
                            value={draft.about}
                            disabled={!isEdit}
                            onChange={(e) =>
                                updateField("about", e.target.value)
                            }
                        />
                    </div>

                     РЕЖИМЫ
                    <div className="profile-card">
                        <h2 className="profile-card__title">
                            Игровые режимы
                        </h2>

                        <div className="profile-tags">
                            {allModes.map((mode) => {
                                const active = draft.modes.includes(mode.value);

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

                     ВРЕМЯ
                    <div className="profile-card">
                        <h2 className="profile-card__title">
                            Когда играешь
                        </h2>

                        <div className="profile-tags">
                            {allTimeModes.map((item) => {
                                const active =
                                    draft.timeModes.includes(item);

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
                </div>*/}
                <div className="profile-grid">
                   <ProfileMember startConversation={startConversation} member={member} />
                   <ProfileInfo  member={member} />
                   {/*<ProfileGameTags member={member} allGameModes={allGameModes} isEdit={isEdit} toggleMode={toggleMode} />
                   <ProfileTimeTags allTimeModes={allTimeModes} member={member} isEdit={isEdit} toggleTimeMode={toggleTimeMode} />*/}
                </div>
            </div>
        </section>
    );
}

