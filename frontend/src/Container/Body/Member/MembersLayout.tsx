import {Outlet} from "react-router-dom";
import {Header} from "../../Header/Header.tsx";
import {LeftSideBar} from "../../LeftSideBar/LeftSideBar.tsx";

export function MembersLayout() {
    return (
        <div id="container-layout" className="container member-layout">
            <aside className="app-sidebar">
                <LeftSideBar/>
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