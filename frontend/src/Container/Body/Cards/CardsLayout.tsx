import {Outlet} from "react-router-dom";
import {Header} from "../../Header/Header.tsx";
import {CardFilterWrapper} from "../../LeftSideBar/CardFilter/CardFilterWrapper.tsx";
import {useLoadAlbums} from "../../../Hooks/Body/albumHook.ts";

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
                <Outlet/>
            </main>
        </div>
    </div>
)
    ;
}