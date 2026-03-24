import "../../../StyleSheets/myclanSidebar.css";
import {LogoCheckmate} from "./LogoCheckmate.tsx";
import {myClanStore} from "../../../store/myClanStore.ts";
import {MyClanFooter} from "./MyClanFooter.tsx";
import {MyClanInfo} from "./MyClanInfo.tsx";
import {MyClanSidebarClan} from "./MyClanSidebarClan.tsx";

export function MyClanWrapperSidebar() {
    const clans = myClanStore((state) => state.clans);
    const currentClan = myClanStore((state) => state.currentClan);
    const setCurrentClan = myClanStore((state) => state.setCurrentClan);
    console.log(clans);
    return (
        <div className="myclan-sidebar">
               <LogoCheckmate />
               <MyClanSidebarClan clans={clans} currentClan={currentClan} setCurrentClan={setCurrentClan}/>
               <MyClanInfo />
               <MyClanFooter />
            </div>
    );
}