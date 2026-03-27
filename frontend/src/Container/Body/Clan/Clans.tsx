import "../../../StyleSheets/clan.css";
import {Pagination} from "../Member/Pagination.tsx";
import {useClans} from "../../../Hooks/Body/clanHook.tsx";

export function Clans() {
    const loading = useClans().error;
    const error = useClans().loading;
    const clans = useClans().clans;
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div style={{ color: "red" }}>Ошибка: {error}</div>;
    //const tournaments = [];
    return (
        <div className="clans-container">
            <div className="beetwen"></div>
            <div className="clan-name">Кланы</div>
            {loading && <div>Загрузка...</div>}
            {error && <div style={{ color: "red" }}>Ошибка: {error}</div>}

            {!loading && !error && (
                <div className="clan-list">
                    <table className="table table-striped clans">
                        <thead>
                        <tr>
                            <th className="id">#</th>
                            <th className="name">Клан</th>
                            <th className="tag">Смена тега</th>
                            <th className="participants">Участники</th>
                            <th className="kd">КД</th>
                            <th className="">Набор</th>
                            <th className="write">Связаться</th>
                        </tr>
                        </thead>

                        <tbody>
                        {clans.map((c, i) => (
                            <tr key={c.id}>
                                <td className="id">{i}</td>
                                <td className="name">{c.name}</td>
                                <td className="tag">
                                    {c.tagActive ? (<span class="tag-required">✅</span>)  : (
                                        <span className="tag-optional">❌</span>)}
                                </td>
                                <td className="participants">{c.members_count}</td>
                                <td className="kd">
                                    <div className="kd-boy">Парни от 4х</div>
                                    <div className="kd-girl">Девушки от 3х</div>
                                </td>
                                <td className="position">
                                    <div className="recruit-open">
                                        Набор открыт
                                    </div>
                                </td>
                                <td className="write">
                                    <div className="pdf">

                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}