"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

export function NavigationTabs(){
    const pathname = usePathname();
    return (
        <div className="navigation-tabs">
            <ul className="navbar-nav" role="navigation" aria-label="Navigation 1">
                <li className="nav-item ">
                    <Link href="/players" className={`nav-link ${pathname === "/players" ? "active" : ""}`}>Игроки</Link></li>
                <li className="nav-item ">
                    <Link href="/clans" className={`nav-link ${pathname === "/clans" ? "active" : ""}`}>Кланы</Link>
                </li>
                <li className="nav-item ">
                    <Link href="/tournaments" className={`nav-link ${pathname === "/tournaments" ? "active" : ""}`}>Турниры</Link>
                </li>
            </ul>
        </div>
    )
}