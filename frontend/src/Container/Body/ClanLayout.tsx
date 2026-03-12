import {Outlet} from "react-router-dom";
import {Header} from "../Header/Header.tsx";
import {LeftSideBarClans} from "../LeftSideBar/LeftSIdeBarClans";

export function ClanLayout(){
    return (
        <div className="container">
            <LeftSideBarClans/>
            <Header/>
            <Outlet />
        </div>
    );
}