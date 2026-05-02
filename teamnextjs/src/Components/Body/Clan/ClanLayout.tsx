"use client";

import {Header} from "@/src/Components/Header/Header.tsx";
import {LeftSideBarClans} from "@/src/Components/LeftSideBar/LeftSIdeBarClans.tsx";
import {ClanPage} from "@/src/Components/Body/Clan/ClanPage";
/*import  "@/src/StyleSheets/baseMarkup.css";
import  "@/src/StyleSheets/myclanSidebar.css";*/

export function ClanLayout(){
    return (
    <div id="container-layout" className="container myclans-layout">
        <aside className="app-sidebar">
            <LeftSideBarClans/>
        </aside>
        <div className="app-main">
            <Header/>
            <main className="app-content">
                <ClanPage />
            </main>
        </div>
    </div>
)
    ;
}