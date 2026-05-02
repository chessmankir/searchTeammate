"use client";

import {Header} from "@/src/Components/Header/Header.tsx";
import {LeftSideBarTournaments} from "@/src/Components/LeftSideBar/LeftSideBarTournaments.tsx";
import {TournamentsPage} from "@/src/Components/Body/Tournament/TournamentsPage";

export function TournamentsLayout() {
    return (
        <div id="container-layout" className="container tournament-layout">
            <aside className="app-sidebar">
                <LeftSideBarTournaments/>
            </aside>
            <div className="app-main">
                <Header/>
                <main className="app-content">
                    <TournamentsPage/>
                </main>
            </div>
        </div>
    )
}