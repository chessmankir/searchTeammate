import {Outlet} from "react-router-dom";
import {Header} from "../../Header/Header.tsx";
import {LeftSideBarTournaments} from "../../LeftSideBar/LeftSideBarTournaments.tsx";

export function TournamentsLayout() {
    return (
        <div id="container-layout" className="container tournament-layout">
            <aside className="app-sidebar">
                <LeftSideBarTournaments/>
            </aside>
            <div className="app-main">
                <Header/>
                <main className="app-content">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}