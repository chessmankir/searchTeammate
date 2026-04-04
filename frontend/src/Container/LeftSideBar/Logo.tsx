import "../../StyleSheets/logo.css";
import {useNavigate} from "react-router-dom";

export  function Logo(){
    const navigate = useNavigate();
    return (
        <div onClick={() => {navigate("/");}} className="myclan-sidebar__logo">
            <div className="myclan-sidebar__logo-icon">C</div>
            <div>
                <div className="myclan-sidebar__logo-title">Checkmate</div>
                <div className="myclan-sidebar__logo-subtitle">Поиск тиммейтов</div>
            </div>
        </div>
    );
}