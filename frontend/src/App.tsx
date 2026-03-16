import {Navigate, Route, Routes} from "react-router-dom";
import {MembersLayout} from "./Container/Body/MembersLayout.tsx";
import {MembersPage} from "./Container/Body/MembersPage.tsx";
import {TournamentsLayout} from "./Container/Body/TournamentsLayout.tsx";
import {TournamentsPage} from "./Container/Body/TournamentsPage.tsx";
import {ClanLayout} from "./Container/Body/ClanLayout.tsx";
import {ClanPage} from "./Container/Body/ClanPage.tsx"
import {CardsLayout } from "./Container/Body/Cards/CardsLayout.tsx";

import './StyleSheets/header.css'
import './StyleSheets/leftSideBar.css'
import {LoginPage} from "./Container/Body/Login/LoginPage.tsx";
import {authStore} from "./store/authStore.ts";
import {useEffect} from "react";
import {CardsPage} from "./Container/Body/Cards/CardsPage.tsx";
import {CurrentCardPage} from "./Container/Body/Cards/CurrentCardPage.tsx";


function App() {
    const checkAuth = authStore((state) => state.checkAuth);
    useEffect(() => {
        checkAuth()
    }, [checkAuth]);
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/players" replace />} />
        <Route path="/index.html" element={<Navigate to="/players" replace />} />
        <Route path="/players" element={<MembersLayout/>}>
            <Route index element={<MembersPage />}/>
        </Route>
        <Route path="/tournaments" element={<TournamentsLayout />}>
            <Route index  element={<TournamentsPage />} />
        </Route>
        <Route path="/clans" element={<ClanLayout />}>
            <Route index element={<ClanPage />}></Route>
        </Route>
        <Route path="/cards" element={<CardsLayout />}>
            <Route index element={<CardsPage />}></Route>
            <Route path=":albumid" element={<CurrentCardPage/>}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}>
        </Route>
    </Routes>
  );
}

export default App;
