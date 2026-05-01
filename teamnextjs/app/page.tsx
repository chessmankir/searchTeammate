import Image from "next/image";
import {Members} from "@/src/Components/Member/Members";
import {LeftSideBar} from "@/src/Components/LeftSideBar/LeftSideBar";
import {Header} from "@/src/Components/Header/Header";


export default function Home() {
  return (
      <div id="container-layout" className="container member-layout">
          <aside className="app-sidebar">
              <LeftSideBar/>
          </aside>
          <div className="app-main">
              <Header/>
              <main className="app-content">
                  <div id="body">
                      <div className="name-body"></div>
                      <div className="body-container">
                          <Members/>
                      </div>
                  </div>
              </main>
          </div>
      </div>
  );
}
