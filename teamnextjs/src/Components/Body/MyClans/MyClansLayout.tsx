import {Header} from "@/src/Components/Header/Header.tsx";
import {MyClanWrapperSidebar} from "@/src/Components/LeftSideBar/MyClan/MyClanWrapperSidebar.tsx";
import {MyClansPage} from "@/src/Components/Body/MyClans/MyClansPage";

export function MyClansLayout(){
    return (
        <div id="container-layout" className="container myclans-layout">
            <aside className="app-sidebar">
                <MyClanWrapperSidebar/>
            </aside>
            <div className="app-main">
                <Header/>
                <main className="app-content">
                    <MyClansPage />
                </main>
            </div>
        </div>
    );
}