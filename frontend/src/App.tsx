import {Navigate, Route, Routes} from "react-router-dom";
import {MembersLayout} from "./Container/Body/Member/MembersLayout.tsx";
import {MembersPage} from "./Container/Body/Member/MembersPage.tsx";
import {TournamentsLayout} from "./Container/Body/Tournament/TournamentsLayout.tsx";
import {TournamentsPage} from "./Container/Body/Tournament/TournamentsPage.tsx";
import {ClanLayout} from "./Container/Body/Clan/ClanLayout.tsx";
import {ClanPage} from "./Container/Body/Clan/ClanPage.tsx"
import {CardsLayout } from "./Container/Body/Cards/CardsLayout.tsx";
import {LoginPage} from "./Container/Body/Login/LoginPage.tsx";
import {authStore} from "./store/authStore.ts";
import {useEffect} from "react";
import {CardsPage} from "./Container/Body/Cards/CardsPage.tsx";
import {CurrentCardPage} from "./Container/Body/Cards/CurrentCardPage.tsx";
import {AllCardsPage} from "./Container/Body/Cards/AllCardsPage.tsx";
import {MyClansPage} from "./Container/Body/MyClans/MyClansPage.tsx";
import {MyClansLayout} from "./Container/Body/MyClans/MyClansLayout.tsx";
import "./StyleSheets/baseMarkup.css";
import ProfilePage from "./Container/Body/Profile/ProfilePage.tsx";
import {ProfileLayout} from "./Container/Body/Profile/ProfileLayout.tsx";
import {MessagesLayout} from "./Container/Body/Messages/MessagesLayout.tsx";
import MessagesPage from "./Container/Body/Messages/MessagesPage.tsx";
import {CardDuplicatesPage} from "./Container/Body/Cards/Duplicates/CardDuplicatePage.tsx";

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
        <Route path="/albums" element={<CardsLayout />}>
            <Route index element={<CardsPage/>}></Route>
        </Route>
        <Route path="/cards" element={<CardsLayout />}>
            <Route index element={<AllCardsPage />}></Route>
            <Route path=":albumId" element={<CurrentCardPage/>}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}>
        </Route>
        <Route path="/myclan" element={<MyClansLayout />}>
            <Route index element={<MyClansPage />} />
        </Route>
        <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path=":pubg_id" element={<ProfilePage />} />
        </Route>
        <Route path="/messages" element={<MessagesLayout />}>
            <Route index element={<MessagesPage />} />
        </Route>
        <Route path="/duplicates" element={<CardsLayout />}>
            <Route index element={<CardDuplicatesPage />} />
        </Route>

    </Routes>
  );
}

export default App;
