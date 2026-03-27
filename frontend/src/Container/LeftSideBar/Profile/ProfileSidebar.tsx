import {NavLink} from "react-router-dom";

export function ProfileSidebar({navItems}){
    return (
        <div className="profile-sidebar">
            <div className="profile-sidebar__top">
                <div className="profile-sidebar__logo">Checkmate</div>
                <p className="profile-sidebar__subtitle">Личный кабинет</p>
            </div>

            <nav className="profile-sidebar__nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({isActive}) =>
                            isActive
                                ? "profile-sidebar__link profile-sidebar__link--active"
                                : "profile-sidebar__link"
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    )
}