import "../../../StyleSheets/myclanSidebar.css";
import {LogoCheckmate} from "./LogoCheckmate.tsx";
import {myClanStore} from "../../../store/myClanStore.ts";
import {MyClanFooter} from "./MyClanFooter.tsx";
import {MyClanInfo} from "./MyClanInfo.tsx";
import {MyClanSidebarClan} from "./MyClanSidebarClan.tsx";
import {profileLinks} from "../../../Data/navItems.ts";
import {ProfileSidebar} from "../Profile/ProfileSidebar.tsx";

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