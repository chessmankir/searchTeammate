import {Logo} from "./Logo.tsx";
import {Filters} from "./MemberFilter/Filters.tsx";
import '../../StyleSheets/leftSideBar.css'

export  function LeftSideBar(){
    return (
        <div id="left-side-bar">
            <Logo />
            <Filters />
        </div>
    )
}