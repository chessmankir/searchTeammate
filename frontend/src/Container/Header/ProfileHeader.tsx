import {Link, NavLink, useNavigate} from "react-router-dom";
import {authStore} from "../../store/authStore.ts";
import {useState} from "react";
import {useProfileLogout} from "../../Hooks/Body/Profile/useProfileLogout.ts";

export function ProfileHeader(){
    const user = authStore((state)=>state.user);
    const isAuth = authStore((state) =>state.isAuth );
    const [stateDropDown, setStateDropDown] = useState<boolean>(false);

    const { logout } = useProfileLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log("logout");
        const ok = await logout();

        if (ok) {
            navigate("/");
        }
    };

    return (
      <div className="profile-header">
          {!isAuth ? (
          <div className="login-btn">
              <Link to="/login">Войти</Link>
          </div>
          ):(
              <div className="header-user headerProfile">
                  <button onClick={() => setStateDropDown(!stateDropDown)} className="headerProfile__trigger">
                      <div className="headerProfile__avatar">C</div>
                      <span className="headerProfile__name"> {user?.nickname || user?.pubg_id}</span>
                      <span className="headerProfile__arrow">▾</span>
                  </button>
                  {stateDropDown && (
                      <div className="headerProfile__menu">
                          <button className="headerProfile__item">
                              <NavLink to="/profile">Профиль</NavLink>
                          </button>
                          <button className="headerProfile__item">
                              <NavLink to="/albums">Карты</NavLink>
                          </button>
                          <button className="headerProfile__item">
                              <NavLink to="/myclan">Мой клан</NavLink>
                          </button>
                          <button className="headerProfile__item">Настройки</button>
                          <button onClick={handleLogout} className="headerProfile__item headerProfile__item--danger">Выйти</button>
                      </div>
                  )}
              </div>
          )}
      </div>
    );
}