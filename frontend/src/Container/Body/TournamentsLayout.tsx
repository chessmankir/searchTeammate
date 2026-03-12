import {Outlet} from "react-router-dom";
import {Header} from "../Header/Header.tsx";
import {LeftSideBarTournaments} from "../LeftSideBar/LeftSideBarTournaments.tsx";

export function TournamentsLayout(){
    return (
        <div className="container">
            <LeftSideBarTournaments/>
            <Header/>
            <Outlet />
        </div>
    );
}