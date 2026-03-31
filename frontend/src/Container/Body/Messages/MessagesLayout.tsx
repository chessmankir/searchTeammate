import {Outlet} from "react-router-dom";
import {Header} from "../../Header/Header.tsx";
import MessagesSidebarWrapper from "../../LeftSideBar/Messages/MessagesSidebarWrapper.tsx";

export function MessagesLayout() {

    return (
        <div id="container-layout" className="container member-layout">
            <aside className="app-sidebar">
                <MessagesSidebarWrapper/>
            </aside>
            <div className="app-main">
                <Header/>
                <main className="app-content">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}