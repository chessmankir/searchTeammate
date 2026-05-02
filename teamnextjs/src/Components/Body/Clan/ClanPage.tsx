import "@/src/StyleSheets/body.css";
import "@/src/StyleSheets/pagination.css";
import {Clans} from "@/src/Components/Body/Clan/Clans";

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