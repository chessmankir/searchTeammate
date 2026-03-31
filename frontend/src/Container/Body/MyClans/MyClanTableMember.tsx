import { Link } from "react-router-dom";
import type { ClanMember } from "../../../types/ClanMember.ts";

type Props = {
    members: ClanMember[];
};

export function MyClanTableMember({ members }: Props) {
    return (
        <div className="myclan-table-wrap">
            <table className="myclan-table">
                <thead>
                <tr>
                    <th>Участник</th>
                    <th>PUBG ID</th>
                    <th>Возраст</th>
                    <th>Город</th>
                    <th>Роль</th>
                    <th>В клане</th>
                    <th>Действия</th>
                </tr>
                </thead>

                <tbody>
                {members.map((member) => (
                    <tr key={member.id}>
                        <td>
                            <div className="myclan-member">
                                <div className="myclan-member__info">
                                    <div className="myclan-member__name">{member.name}</div>
                                    <div className="myclan-member__nickname">{member.nickname}</div>
                                </div>
                            </div>
                        </td>

                        <td>{member.pubg_id}</td>
                        <td>{member.age}</td>
                        <td>{member.city}</td>

                        <td>
                                <span
                                    className={`myclan-badge myclan-badge--role ${
                                        member.role === "Лидер"
                                            ? "myclan-badge--purple"
                                            : member.role === "Рекрутер"
                                                ? "myclan-badge--blue"
                                                : "myclan-badge--gray"
                                    }`}
                                >
                                    {member.role ?? "Участник"}
                                </span>
                        </td>

                        <td>
                            <div className="myclan-clan-time">
                                <div>{member.timeInClan}</div>
                            </div>
                        </td>

                        <td>
                            <div className="myclan-row-actions">
                                <Link
                                    to={`/profile/${member.pubg_id}`}
                                    className="myclan-btn myclan-btn--small myclan-btn--ghost"
                                >
                                    Профиль
                                </Link>

                                <button
                                    type="button"
                                    className="myclan-btn myclan-btn--small myclan-btn--danger"
                                >
                                    Бан
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}