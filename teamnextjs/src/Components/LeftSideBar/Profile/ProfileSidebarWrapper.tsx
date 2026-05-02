"use client";

import {profileLinks} from "@/src/Data/navItems.ts";
import {Logo} from "@/src/Components/LeftSideBar/Logo";
import {ProfileSidebar} from "@/src/Components/LeftSideBar/Profile/ProfileSidebar";

export default function ProfileSidebarWrapper() {
    return (
        <aside>
            <Logo/>
            <ProfileSidebar navItems={profileLinks} />
        </aside>
    );
}