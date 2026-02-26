import { useEffect, useState } from "react";
import { fetchClanMembers, ClanMember } from "../../api/members.tsx";

export function Members() {

    const [members, setMembers] = useState<ClanMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const data = await fetchClanMembers();
                setMembers(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div style={{ color: "red" }}>Ошибка: {error}</div>;

    return (
        <div className="member-container">
            <div className="beetwen"></div>
            <div className="member-name">Игроки</div>

            {loading && <div>Загрузка...</div>}
            {error && <div style={{ color: "red" }}>Ошибка: {error}</div>}

            {!loading && !error && (
                <div className="member-list">
                    <table className="table table-striped projects">
                        <thead>
                        <tr>
                            <th className="id">#</th>
                            <th className="nameContainer">Имя/Ник</th>
                            <th className="pubgid">PUBG ID</th>
                            <th className="age">Возраст</th>
                            <th className="city">Город</th>
                            <th className="tg">Клан</th>
                        </tr>
                        </thead>

                        <tbody>
                        {members.map((m, i) => (
                            <tr key={m.id ?? i}>
                                <td className="id">{i + 1}</td>
                                <td className="nameContainer" className="iconMan">
                                    <div className="icon"></div>
                                    <div className="nameWrapper">
                                        <div className="name">{m.username ? `@${m.username.replace("@", "")}` : "—"}</div>
                                        <div className="nick"></div>
                                    </div>
                                </td>
                                <td className="pubgid">{m.pubg_id ?? "—"}</td>
                                <td className="age">
                                    {m.clan_id ?? "—"}{m.number != null ? ` (№${m.number})` : ""}
                                </td>
                                <td className="city">
                                    {m.clan_id ?? "—"}{m.number != null ? ` (№${m.number})` : ""}
                                </td>
                                <td className="tg">
                                    {m.clan_id ?? "—"}{m.number != null ? ` (№${m.number})` : ""}
                                </td>
                            </tr>
                        ))}

                        {members.length === 0 && (
                            <tr>
                                <td colSpan={5}>Нет участников</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}