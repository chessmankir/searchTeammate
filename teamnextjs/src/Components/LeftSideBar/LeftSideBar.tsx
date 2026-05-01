import '@/src/StyleSheets/leftSideBar.css';
import '@/src/StyleSheets/myclanSidebar.css';
import {Logo} from "@/src/Components/LeftSideBar/Logo";
import {Filters} from "@/src/Components/LeftSideBar/MemberFilter/Filters";

export  function LeftSideBar(){
    return (
        <div id="left-side-bar">
            <Logo />
            <Filters />
        </div>
    )
}