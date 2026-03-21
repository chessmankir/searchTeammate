import {Outlet} from "react-router-dom";
import {Header} from "../../Header/Header.tsx";
import {CardFilterWrapper} from "../../LeftSideBar/CardFilter/CardFilterWrapper.tsx";

export function CardsLayout(){
    return (
        <div className="container">
            <CardFilterWrapper/>
            <Header/>
            <Outlet />
        </div>
    );
}