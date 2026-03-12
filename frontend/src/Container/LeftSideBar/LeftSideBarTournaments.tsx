import {Logo} from "./Logo";
import {FilterTournaments} from "./FilterTournaments.tsx";

export  function LeftSideBarTournaments(){
    return (
        <div id="left-side-bar">
            <Logo />
            <FilterTournaments />
        </div>
    )
}