import {Outlet} from "react-router-dom";
import {Header} from "../../Header/Header.tsx";
import ProfileSidebarWrapper from "../../LeftSideBar/Profile/ProfileSidebarWrapper.tsx";

export function ProfileLayout() {
    return (
        <div id="container-layout" className="container">
            <aside className="app-sidebar">
                <ProfileSidebarWrapper />
            </aside>

            <div className="app-main">
                <Header />
                <main className="app-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}