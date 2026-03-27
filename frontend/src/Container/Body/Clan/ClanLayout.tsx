import {Outlet} from "react-router-dom";
import {Header} from "../../Header/Header.tsx";
import {LeftSideBarClans} from "../../LeftSideBar/LeftSIdeBarClans.tsx";
import {MyClanWrapperSidebar} from "../../LeftSideBar/MyClan/MyClanWrapperSidebar.tsx";

export function ClanLayout(){
    return (
    <div id="container-layout" className="container myclans-layout">
        <aside className="app-sidebar">
            <LeftSideBarClans/>
        </aside>
        <div className="app-main">
            <Header/>
            <main className="app-content">
                <Outlet/>
            </main>
        </div>
    </div>
)
    ;
}