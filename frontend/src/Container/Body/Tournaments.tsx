import "../../StyleSheets/tournaments.css";
import {Pagination} from "./Pagination.tsx";
import {useTournamentHook} from "../../Hooks/Body/tournamentHook.tsx";

export function Tournaments() {
    const {tournaments} = useTournamentHook();
    const loading = false;
    const error = false;
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div style={{ color: "red" }}>Ошибка: {error}</div>;
    //const tournaments = [];
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
                            <th className="image">

                            </th>
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
                        {tournaments.map((t) => (
                            <tr key={t.id}>
                                <td className="image">
                                    <div className="logo">
                                        <img src="./src/assets/logo.jpg"/>
                                    </div>
                                </td>
                                <td className="id">{t.name}</td>
                                <td className="data">{t.date}</td>
                                <td className="time">{t.time}</td>
                                <td className="format">{t.team_size}</td>
                                <td className="maps">{t.maps}</td>
                                <td className="places">{100 - t.count}</td>
                                <td className="position">
                                    <div className="pdf">
                                        <img src="/src/assets/pdf.gif"/>
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