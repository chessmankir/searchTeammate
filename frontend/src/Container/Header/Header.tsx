import {NavigationTabs} from "./NavigationTabs.tsx";
import {InfoTabs} from "./InfoTabs.tsx";
import {ProfileHeader} from "./ProfileHeader";

export function Header (){
    return <div id="header">
        <NavigationTabs />
        <InfoTabs />
        <ProfileHeader/>
    </div>
}