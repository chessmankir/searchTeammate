"use client";

import {authStore} from "@/src/Store/authStore.ts";
import {useState} from "react";
import {useProfileLogout} from "@/src/Hooks/Body/Profile/useProfileLogout.ts";
import Link from "next/link";
import {useRouter} from "next/navigation";

export function ProfileHeader(){
    const user = authStore((state)=>state.user);
    const isAuth = authStore((state) =>state.isAuth );
    const [stateDropDown, setStateDropDown] = useState<boolean>(false);

    const { logout } = useProfileLogout();
    const router = useRouter();

    const handleLogout = async () => {
        console.log("logout");
        const ok = await logout();
        if (ok) {
            router.push("/");
        }
    };

    return (
      <div className="profile-header">
          {!isAuth ? (
          <div className="login-btn">
              <Link href="/login">Войти</Link>
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
                              <Link href="/profile">Профиль</Link>
                          </button>
                          <button className="headerProfile__item">
                              <Link href="/albums">Карты</Link>
                          </button>
                          <button className="headerProfile__item">
                              <Link href="/myclan">Мой клан</Link>
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