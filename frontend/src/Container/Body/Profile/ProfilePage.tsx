import { useState } from "react";
import "../../../StyleSheets/profile.css";
import {useParams} from "react-router-dom";

type GameMode = "classic" | "metro" | "tdm";

type ProfileType = {
    id: number;
    nickname: string;
    pubg_id: string;
    name: string;
    age: number | null;
    city: string;
    about: string;
    modes: GameMode[];
    timeModes: string[];
};

const initialProfile: ProfileType = {
    id: 1,
    nickname: "ChessmanKir",
    pubg_id: "523442956",
    name: "Кирилл",
    age: 25,
    city: "Helsinki",
    about: "Ищу тиммейтов для рангов и турниров",
    modes: ["classic", "tdm"],
    timeModes: ["вечер"],
};

const allModes: { value: GameMode; label: string }[] = [
    { value: "classic", label: "Classic" },
    { value: "metro", label: "Metro" },
    { value: "tdm", label: "TDM" },
];

const allTimeModes = ["утро", "день", "вечер", "ночь"];

export default function ProfilePage() {
    const {pubg_id} = useParams();
    console.log(pubg_id);
    const [profile, setProfile] = useState<ProfileType>(initialProfile);
    const [draft, setDraft] = useState<ProfileType>(initialProfile);
    const [isEdit, setIsEdit] = useState(false);

    const hasChanges =
        JSON.stringify(profile) !== JSON.stringify(draft);

    const updateField = <K extends keyof ProfileType>(
        key: K,
        value: ProfileType[K]
    ) => {
        setDraft((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const toggleMode = (mode: GameMode) => {
        setDraft((prev) => {
            const exists = prev.modes.includes(mode);

            return {
                ...prev,
                modes: exists
                    ? prev.modes.filter((m) => m !== mode)
                    : [...prev.modes, mode],
            };
        });
    };

    const toggleTimeMode = (value: string) => {
        setDraft((prev) => {
            const exists = prev.timeModes.includes(value);

            return {
                ...prev,
                timeModes: exists
                    ? prev.timeModes.filter((t) => t !== value)
                    : [...prev.timeModes, value],
            };
        });
    };

    const startEdit = () => {
        setDraft(profile);
        setIsEdit(true);
    };

    const cancelEdit = () => {
        setDraft(profile);
        setIsEdit(false);
    };

    const saveProfile = () => {
        setProfile(draft);
        setIsEdit(false);

        console.log("Сохранили:", draft);
    };

    return (
        <section className="profile-page">
            <div className="profile-content">
                {/* HEADER */}
                <div className="profile-header-card">
                    <div className="profile-header-card__left">
                        <div className="profile-avatar">
                            {draft.nickname[0].toUpperCase()}
                        </div>

                        <div>
                            <h1 className="profile-title">{draft.nickname}</h1>
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

                {/* GRID */}
                <div className="profile-grid">
                    {/* ОСНОВНАЯ ИНФА */}
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

                    {/* О СЕБЕ */}
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

                    {/* РЕЖИМЫ */}
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

                    {/* ВРЕМЯ */}
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
                </div>
            </div>
        </section>
    );
}