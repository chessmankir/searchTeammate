import {NavLink} from "react-router-dom";

export function NavigationTabs(){
    return (
        <div className="navigation-tabs">
            <ul className="navbar-nav" role="navigation" aria-label="Navigation 1">
                <li className="nav-item ">
                    <NavLink to="/players" className="nav-link">Игроки</NavLink></li>
                <li className="nav-item ">
                    <NavLink to="/clans" className="nav-link">Кланы</NavLink>
                </li>
                <li className="nav-item ">
                    <NavLink to="/tournaments" className="nav-link">Турниры</NavLink>
                </li>
            </ul>
        </div>
    )
}