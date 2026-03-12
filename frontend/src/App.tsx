import {Navigate, Route, Routes} from "react-router-dom";
import {MembersLayout} from "./Container/Body/MembersLayout.tsx";
import {MembersPage} from "./Container/Body/MembersPage.tsx";
import {TournamentsLayout} from "./Container/Body/TournamentsLayout.tsx";
import {TournamentsPage} from "./Container/Body/TournamentsPage.tsx";
import {ClanLayout} from "./Container/Body/ClanLayout.tsx";
import {ClanPage} from "./Container/Body/ClanPage.tsx"
import './StyleSheets/header.css'
import './StyleSheets/leftSideBar.css'
import {LoginPage} from "./Container/Body/Login/LoginPage.tsx";

function App() {
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
        <Route path="/login" element={<LoginPage />}>
        </Route>
    </Routes>
  );
}

export default App;
