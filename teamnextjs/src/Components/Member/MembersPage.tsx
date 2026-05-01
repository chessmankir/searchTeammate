import "@/src/StyleSheets/body.css";
import "@/src/StyleSheets/pagination.css";
import {Members} from "./Members.tsx";

export  function MembersPage(){
    return (
        <div id="body">
            <div className="name-body"></div>
            <div className="body-container">
                <Members/>
            </div>
        </div>
    )
}