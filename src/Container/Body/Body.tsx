import "../../StyleSheets/body.css"
import {Members} from "./Members";
import {pool} from "../../db/connection.tsx"

export  function Body(){
    const connect = pool.connect();
    console.log("connected");
    return (
        <div id="body">
            <div className="name-body"></div>
            <div className="body-container">
                <Members />
            </div>
        </div>
    )
}