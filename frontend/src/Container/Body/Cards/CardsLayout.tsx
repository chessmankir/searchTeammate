import {Outlet} from "react-router-dom";
import {Header} from "../../Header/Header.tsx";
import {LeftSideBar} from "../../LeftSideBar/LeftSideBar.tsx";

export function CardsLayout(){
    return (
        <div className="container">
            <LeftSideBar/>
            <Header/>
            <Outlet />
        </div>
    );
}