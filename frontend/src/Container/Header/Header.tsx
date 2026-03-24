import {NavigationTabs} from "./NavigationTabs.tsx";
import {InfoTabs} from "./InfoTabs.tsx";
import {ProfileHeader} from "./ProfileHeader";
import "../../StyleSheets/header.css";

export function Header() {
    return (
        <header className="app-header">
            <NavigationTabs/>
            <InfoTabs/>
            <ProfileHeader/>
        </header>
    );
}