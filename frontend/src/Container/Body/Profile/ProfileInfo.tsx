import type { ClanMember } from "../../../types/ClanMember.ts";

type Props = {
    member?: ClanMember;
};

export function ProfileInfo({ member }: Props) {
    return (
        <div className="profile-card">
            <h2 className="profile-card__title">
                Основная информация
            </h2>

            <div className="profile-form-grid">
                <label className="profile-field">
                    <span>Ник</span>
                    <input value={member?.nickname ?? ""} readOnly />
                </label>

                <label className="profile-field">
                    <span>PUBG ID</span>
                    <input value={member?.pubg_id ?? ""} readOnly />
                </label>

                <label className="profile-field">
                    <span>Имя</span>
                    <input value={member?.name ?? ""} readOnly />
                </label>

                <label className="profile-field">
                    <span>Возраст</span>
                    <input
                        type="number"
                        value={member?.age ?? ""}
                        readOnly
                    />
                </label>

                <label className="profile-field profile-field--full">
                    <span>Город</span>
                    <input value={member?.city ?? ""} readOnly />
                </label>
            </div>
        </div>
    );
}