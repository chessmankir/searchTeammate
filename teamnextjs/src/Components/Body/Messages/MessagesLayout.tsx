import {Header} from "@/src/Components/Header/Header";
import MessagesSidebarWrapper from "@/src/Components/LeftSideBar/Messages/MessagesSidebarWrapper";
import MessagesPage from "@/src/Components/Body/Messages/MessagesPage";

export function MessagesLayout() {

    return (
        <div id="container-layout" className="container member-layout container-layout-messages">
            <aside className="app-sidebar">
                <MessagesSidebarWrapper/>
            </aside>
            <div className="app-main">
                <Header/>
                <main className="app-content">
                   <MessagesPage />
                </main>
            </div>
        </div>
    )
}