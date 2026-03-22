import {Link, NavLink} from "react-router-dom";
import {authStore} from "../../store/authStore.ts";
import {useState} from "react";

export function ProfileHeader(){
    const user = authStore((state)=>state.user);
    const isAuth = authStore((state) =>state.isAuth );
    const [stateDropDown, setStateDropDown] = useState<boolean>(false);

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
                          <button className="headerProfile__item">Профиль</button>
                          <button className="headerProfile__item">
                              <NavLink to="/albums">Карты</NavLink>
                          </button>
                          <button className="headerProfile__item">Настройки</button>
                          <button className="headerProfile__item headerProfile__item--danger">Выйти</button>
                      </div>
                  )}
              </div>
          )}
      </div>
    );
}