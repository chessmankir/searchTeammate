import {NavLink} from "react-router-dom";

export function NavigationTabs(){
    return (
        <div className="navigation-tabs">
            <ul className="navbar-nav" role="navigation" aria-label="Navigation 1">
                <li className="nav-item ">
                    <NavLink to="/players" className="nav-link">Игроки</NavLink></li>
                <NavLink className="nav-item "><a href="#" className="nav-link">Кланы</a></NavLink>
                <li className="nav-item "><a href="#" className="nav-link">Турниры</a></li>
            </ul>
        </div>
    )
}