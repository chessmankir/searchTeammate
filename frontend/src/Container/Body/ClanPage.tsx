import "../../StyleSheets/body.css";
import "../../StyleSheets/pagination.css";
import {Clans} from "./Clans.tsx";

export  function ClanPage(){
    return (
        <div id="body">
            <div className="name-body"></div>
            <div className="body-container">
                <Clans/>
            </div>
        </div>
    )
}