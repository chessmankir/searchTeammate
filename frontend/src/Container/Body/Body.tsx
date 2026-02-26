import "../../StyleSheets/body.css"
import {Members} from "./Members";

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