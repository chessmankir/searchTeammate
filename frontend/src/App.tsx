import { useState } from 'react'
import {Body} from "./Container/Body/Body";
import {Header} from "./Container/Header/Header";
import {LeftSideBar} from "./Container/LeftSideBar/LeftSideBar";
import {Navigate, Route, Routes} from "react-router-dom";
import {MembersLayout} from "./Container/Body/MembersLayout.tsx";
import {MembersPage} from "./Container/Body/MembersPage.tsx";

import './StyleSheets/header.css'
import './StyleSheets/leftSideBar.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path="/" element={<Navigate to="/players" replace />} />
        <Route path="/index.html" element={<Navigate to="/players" replace />} />
        <Route path="/players" element={<MembersLayout/>}>
            <Route index element={<MembersPage />}/>
        </Route>
    </Routes>
  );
}

export default App;
