import {Outlet} from "react-router-dom";
import {Header} from "../../Header/Header.tsx";
import {CardFilterWrapper} from "../../LeftSideBar/CardFilter/CardFilterWrapper.tsx";
import {useLoadAlbums} from "../../../Hooks/Body/albumHook.ts";

export function CardsLayout(){
    useLoadAlbums();
    return (
        <div className="container">
            <CardFilterWrapper/>
            <Header/>
            <Outlet />
        </div>
    );
}