import "../../StyleSheets/body.css";
import "../../StyleSheets/pagination.css";
import {Members} from "./Member/Members.tsx";
import {Pagination} from "./Member/Pagination.tsx";

export  function Body(){
    return (
        <div id="body">
            <div className="name-body"></div>
            <div className="body-container">
                <Members/>
            </div>
        </div>
    )
}