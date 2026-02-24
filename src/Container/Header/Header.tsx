import {NavigationTabs} from "./NavigationTabs.tsx";
import {InfoTabs} from "./InfoTabs.tsx";

export function Header (){
    return <div id="header">
        <NavigationTabs />
        <InfoTabs />
    </div>
}