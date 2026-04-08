import "../../../StyleSheets/members.css";
import {useMembers} from "../../../Hooks/Body/membersHook.tsx";
import {Pagination} from "./Pagination.tsx";

export function Members() {

    const { members, loading, error} = useMembers();
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div style={{ color: "red" }}>Ошибка: {error}</div>;

    return (
        <div className="member-container">
            <div className="beetwen"></div>
            <div className="member-name">Игроки</div>
            <Pagination/>
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
                            <th className="regimth">Режим</th>
                            <th className="status">Статус</th>
                            <th className="profile">Профиль</th>
                            {/*<th className="tg">Связаться</th>*/}
                        </tr>
                        </thead>

                        <tbody>
                        {members.map((m, i) => (
                            <tr key={m.id ?? i}>
                                <td className="id">{i + 1}</td>
                                <td className="nameContainer">
                                    <div className="icon">
                                        <img src="/assets/iconMan.png" alt=""/>
                                    </div>
                                    <div className="nameWrapper">
                                        <div className="name">{m.name}</div>
                                        <div className="nick">{m.nickname}</div>
                                    </div>
                                </td>
                                <td className="pubgid">{m.pubg_id ?? "—"}</td>
                                <td className="age">
                                    {m.age ?? ""}
                                </td>
                                <td className="city">
                                    {m.city ?? ""}
                                </td>
                                <td className="regim-wrapper">
                                    <div className="regims">
                                        {m.modes?.includes("classic") && (  <div className="regim classic">Классика</div> )}
                                        {m.modes?.includes("metro") && (  <div className="regim metro">Метро</div> )}
                                        {m.modes?.includes("tdm") && (  <div className="regim tdm">Тдм</div> )}
                                        {m.modes?.includes("ultimate") && (  <div className="regim ultimate">Ultimate</div> )}
                                    </div>
                                </td>
                                <td className="status">
                                    {m.status_game == "as" && (
                                        <div className="status-content">
                                            <img className="status-icon" src="/assets/as.png" alt=""/>
                                            <span className="status-text">Продвижение до Аса</span>
                                        </div>
                                    )}
                                    {m.status_game == "asm" && (
                                        <div className="status-content">
                                            <img className="status-icon" src="/assets/asm.png" alt=""/>
                                            <span className="status-text">Продвижение до Ас-мастера</span>
                                        </div>
                                    )}
                                    {m.status_game == "asd" && (
                                        <div className="status-content">
                                            <img className="status-icon" src="/assets/asd.gif" alt=""/>
                                            <span className="status-text">Продвижение до Ас-доминатора</span>
                                        </div>
                                    )}
                                    {m.status_game == "zavic" && (
                                        <div className="status-content">
                                            <img className="status-icon" src="/assets/zavic.gif" alt=""/>
                                            <span className="status-text">Апаю завика</span>
                                        </div>
                                    )}
                                    {m.status_game == "legend" && (
                                        <div className="status-content">
                                            <img className="status-icon" src="/assets/legend.gif" alt=""/>
                                            <span className="status-text">Апаю легенду</span>
                                        </div>
                                    )}

                                </td>
                                <td className="profile">
                                    <div className="myclan-row-actions"><a
                                        className="myclan-btn myclan-btn--small myclan-btn--ghost"
                                        href={`/profile/`+m.pubg_id} data-discover="true">Профиль</a>
                                    </div>
                                </td>
                                {/*<td className="tg">
                                    <div className="iconTg">
                                        <img src="/assets/tg1.gif" alt=""/>
                                    </div>
                                </td>*/}
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