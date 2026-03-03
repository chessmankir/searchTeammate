import "../../StyleSheets/tournaments.css";
import {useMembers} from "../../Hooks/Body/membersHook.tsx";
import {Pagination} from "./Pagination.tsx";


export function Tournaments() {

    const loading = false;
    const error = false;
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div style={{ color: "red" }}>Ошибка: {error}</div>;
    const tournaments = [];
    return (
        <div className="tournament-container">
            <div className="beetwen"></div>
            <div className="tournament-name">Турниры</div>
            {loading && <div>Загрузка...</div>}
            {error && <div style={{ color: "red" }}>Ошибка: {error}</div>}

            {!loading && !error && (
                <div className="tournaments-list">
                    <table className="table table-striped projects">
                        <thead>
                        <tr>
                            <th className="id">Турнир</th>
                            <th className="data">Дата</th>
                            <th className="time">Время</th>
                            <th className="format">Формат</th>
                            <th className="maps">Карты</th>
                            <th className="places">Места</th>
                            <th className="position">Положение</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td className="id">Tati international Cup</td>
                            <td className="data">24.02.26</td>
                            <td className="time">18:00</td>
                            <td className="format">Сквад</td>
                            <td className="maps">Мирамар, Эрангель, Ливик</td>
                            <td className="places">44</td>
                            <td className="position">
                                <div className="pdf">
                                    <img src="src/assets/pdf.gif"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="id">Checkmate Dup Cup #2</td>
                            <td className="data">17.02.26</td>
                            <td className="time">18:00</td>
                            <td className="format">Дуо</td>
                            <td className="maps">Мирамар, Эрангель, Ливик</td>
                            <td className="places">44</td>
                            <td className="position">
                                <div className="pdf">
                                    <img src="src/assets/pdf.gif"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="id">Christam international Cup</td>
                            <td className="data">19.03.26</td>
                            <td className="time">18:00</td>
                            <td className="format">Сквад</td>
                            <td className="maps">Мирамар, Эрангель, Эрангель</td>
                            <td className="places">17</td>
                            <td className="position">
                                <div className="pdf">
                                    <img src="src/assets/pdf.gif"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="id">Pubg mobile Cup</td>
                            <td className="data">18.03.26</td>
                            <td className="time">18:00</td>
                            <td className="format">Соло</td>
                            <td className="maps">Мирамар, Эрангель, Ливик</td>
                            <td className="places">13</td>
                            <td className="position">
                                <div className="pdf">
                                    <img src="src/assets/pdf.gif"/>
                                </div>
                            </td>
                        </tr>
                        {tournaments.map((m, i) => (
                            <tr key={m.id ?? i}>
                                <td className="id">{i + 1}</td>
                                <td className="nameContainer" className="iconMan">
                                    <div className="icon">
                                        <img src="src/assets/iconMan.png" alt=""/>
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
                                        <div className="regim metro">Метро</div>
                                        <div className="regim tdm">TDM</div>
                                        <div className="regim classic">Классика</div>
                                    </div>

                                </td>
                                <td className="tg">
                                    <div className="iconTg">
                                        <img src="src/assets/tg1.gif" alt=""/>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {tournaments.length === 0 && (
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