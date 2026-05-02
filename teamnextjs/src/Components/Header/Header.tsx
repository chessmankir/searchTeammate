"use client";

import "@/src/StyleSheets/header.css";

import {NavigationTabs} from "@/src/Components/Header/NavigationTabs";
import {InfoTabs} from "@/src/Components/Header/InfoTabs";
import {ProfileHeader} from "@/src/Components/Header/ProfileHeader";

export function Header() {
    return (
        <header className="app-header">
           <NavigationTabs/>
           <InfoTabs/>
           <ProfileHeader/>
        </header>
    );
}