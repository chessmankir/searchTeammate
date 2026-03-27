import { useEffect, useState } from "react";
import { fetchClanMembers, ClanMember } from "../../../api/members.tsx";
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
                            <th className="tg">Связаться</th>
                        </tr>
                        </thead>

                        <tbody>
                        {members.map((m, i) => (
                            <tr key={m.id ?? i}>
                                <td className="id">{i + 1}</td>
                                <td className="nameContainer" >
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