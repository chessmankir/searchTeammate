"use client";
import "@/src/StyleSheets/myclanSidebar.css";
import {myClanStore} from "@/src/Store/myClanStore.ts";
import {profileLinks} from "@/src/Data/navItems.ts";
import {LogoCheckmate} from "@/src/Components/LeftSideBar/MyClan/LogoCheckmate";
import {ProfileSidebar} from "@/src/Components/LeftSideBar/Profile/ProfileSidebar";
import {MyClanSidebarClan} from "@/src/Components/LeftSideBar/MyClan/MyClanSidebarClan";
import {MyClanInfo} from "@/src/Components/LeftSideBar/MyClan/MyClanInfo";
import {MyClanFooter} from "@/src/Components/LeftSideBar/MyClan/MyClanFooter";

export function MyClanWrapperSidebar() {
    const clans = myClanStore((state) => state.clans);
    const currentClan = myClanStore((state) => state.currentClan);
    return (
        <div className="myclan-sidebar">
               <LogoCheckmate />
               <ProfileSidebar navItems={profileLinks} />
               <MyClanSidebarClan clans={clans} currentClan={currentClan} />
               <MyClanInfo />
               <MyClanFooter />
            </div>
    );
}