import {Logo} from "./Logo.tsx";
import {FiltersClan} from "./FilttersClans.tsx";

export  function LeftSideBarClans(){
    return (
        <div id="left-side-bar">
            <Logo />
            <FiltersClan />
        </div>
    )
}