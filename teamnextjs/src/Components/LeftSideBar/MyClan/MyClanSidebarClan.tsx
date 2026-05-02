"use client";
import type { MyClan } from "@/src/types/MyClan.ts";
import {useRouter} from "next/navigation";

type MyClanSidebarClanProps = {
    clans: MyClan[];
    currentClan: number;
};

export function MyClanSidebarClan({
                                      clans,
                                      currentClan,
                                  }: MyClanSidebarClanProps) {
    const navigate = useRouter();

    return (
        <div className="myclan-sidebar__section">
            <div className="myclan-sidebar__section-title">Кланы</div>

            <div className="myclan-clan-list">
                {clans.map((clan) => (
                    <button
                        key={clan.id}
                        className={`myclan-clan-item ${
                            clan.number === currentClan ? "myclan-clan-item--active" : ""
                        }`}
                        onClick={() => navigate.push(`/myclan?number=${clan.number}`)}
                    >
                        <span>{clan.title}</span>
                        <span className="myclan-clan-item__count">{clan.real_count}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}