import {Logo} from "../Logo.tsx";
import {ProfileSidebar} from "./ProfileSidebar.tsx";
import {profileLinks} from "../../../Data/navItems.ts";

export default function ProfileSidebarWrapper() {
    return (
        <aside>
            <Logo/>
            <ProfileSidebar navItems={profileLinks} />
        </aside>
    );
}