import "../../StyleSheets/body.css";
import "../../StyleSheets/pagination.css";
import {Members} from "./Members";
import {Pagination} from "./Pagination.tsx";

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