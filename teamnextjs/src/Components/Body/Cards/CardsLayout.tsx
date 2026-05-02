"use client";

import {Header} from "@/src/Components/Header/Header.tsx";
import {CardFilterWrapper} from "@/src/Components/LeftSideBar/CardFilter/CardFilterWrapper.tsx";
import {useLoadAlbums} from "@/src/Hooks/Body/albumHook.ts";
import {CardsPage} from "@/src/Components/Body/Cards/CardsPage";

export function CardsLayout(){
    useLoadAlbums();
    return (
     /*   <div className="container">
            <CardFilterWrapper/>
            <Header/>
            <Outlet/>
        </div>*/

    <div id="container-layout" className="container cards-super-layout">
        <aside className="app-sidebar">
            <CardFilterWrapper/>
        </aside>
        <div className="app-main">
            <Header/>
            <main className="app-content">
                <CardsPage/>
            </main>
        </div>
    </div>
)
    ;
}