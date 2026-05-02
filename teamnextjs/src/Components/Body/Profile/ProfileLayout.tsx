import {Header} from "@/src/Components/Header/Header.tsx";
import ProfileSidebarWrapper from "@/src/Components/LeftSideBar/Profile/ProfileSidebarWrapper.tsx";
import ProfilePage from "@/src/Components/Body/Profile/ProfilePage";

export function ProfileLayout() {
    return (
        <div id="container-layout" className="container">
            <aside className="app-sidebar">
                <ProfileSidebarWrapper />
            </aside>

            <div className="app-main">
                <Header />
                <main className="app-content">
                    <ProfilePage />
                </main>
            </div>
        </div>
    );
}