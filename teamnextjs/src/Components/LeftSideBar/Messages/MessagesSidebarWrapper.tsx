import {Logo} from "../Logo.tsx";
import {ProfileSidebar} from "../Profile/ProfileSidebar.tsx";
import {profileLinks} from "../../../Data/navItems.ts";

export default function MessagesSidebarWrapper() {
    return (
        <aside>
            <Logo/>
            <ProfileSidebar navItems={profileLinks} />
        </aside>
    );
}