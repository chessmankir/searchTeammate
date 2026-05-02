import "@/src/StyleSheets/body.css";
import "@/src/StyleSheets/pagination.css";
import {Tournaments} from "@/src/Components/Body/Tournament/Tournaments";

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