"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/src/Stylesheets/profile.css";

const navItems2 = [
    {to: "/profile", label: "Профиль"},
    {to: "/albums", label: "Карты"},
    {to: "/myclan", label: "Мой клан"},
    {to: "/messages", label: "Сообщения"},
    {to: "/settings", label: "Настройки"},
];

export function ProfileSidebar({navItems}) {
    const pathname = usePathname();

    return (
        <aside className="profile-sidebar">
            <nav className="profile-sidebar__nav">
                {navItems.map((item) => {
                    const isActive = pathname === item.to;

                    return (
                        <Link
                            key={item.to}
                            href={item.to}
                            className={
                                isActive
                                    ? "profile-sidebar__link profile-sidebar__link--active"
                                    : "profile-sidebar__link"
                            }
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}