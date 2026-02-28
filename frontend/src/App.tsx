import { useState } from 'react'
import {Body} from "./Container/Body/Body";
import {Header} from "./Container/Header/Header";
import {LeftSideBar} from "./Container/LeftSideBar/LeftSideBar";

import './StyleSheets/header.css'
import './StyleSheets/leftSideBar.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <LeftSideBar/>
      <Header/>
      <Body/>
    </div>
  );
}

export default App
