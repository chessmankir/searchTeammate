import "../../StyleSheets/body.css";
import "../../StyleSheets/pagination.css";
import {Tournaments} from "./Tournaments.tsx";

export  function TournamentsPage(){
    return (
        <div id="body">
            <div className="name-body"></div>
            <div className="body-container">
                <Tournaments />
            </div>
        </div>
    )
}