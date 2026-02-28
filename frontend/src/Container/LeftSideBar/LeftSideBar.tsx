import {Logo} from "./Logo";
import {Filters} from "./Filters.tsx";

export  function LeftSideBar(){
    return (
        <div id="left-side-bar">
            <Logo />
            <Filters />
        </div>
    )
}