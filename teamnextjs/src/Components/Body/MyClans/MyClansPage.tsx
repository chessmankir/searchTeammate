"use client";

import "@/src/StyleSheets/myclan.css";
import {useClanMember} from "@/src/Hooks/Body/clanMemberHook";
import {useSubclans} from "@/src/Hooks/Body/useSublanHook";
import {myClanStore} from "@/src/Store/myClanStore";
import {MyClanHeader} from "@/src/Components/Body/MyClans/MyClanHeader";
import {MyClanTabs} from "@/src/Components/Body/MyClans/MyClanTabs";
import {MyClanSearch} from "@/src/Components/Body/MyClans/MyClanSearch";
import {MyClanTableMember} from "@/src/Components/Body/MyClans/MyClanTableMember";

export function MyClansPage() {
    useSubclans();
    const {clanMembers, searchData, setSearchData} = useClanMember();
    const clans = myClanStore((state) => state.clans);
    const currentClan = myClanStore( (state) => state.currentClan);
    const totalMembers = myClanStore((state) => state.totalMembers);
    return (
        <div className="myclan-page">
            <MyClanHeader />
            <MyClanTabs clans={clans} currentClan={currentClan} />
            <MyClanSearch totalMembers={totalMembers} searchData={searchData} setSearchData={setSearchData} />
            <MyClanTableMember members={clanMembers} />
            {/*<div className="myclan-stats">
                <div className="myclan-stat-card">
                    <span className="myclan-stat-card__label">Всего участников</span>
                    <strong className="myclan-stat-card__value">42</strong>
                </div>

                <div className="myclan-stat-card">
                    <span className="myclan-stat-card__label">Активных</span>
                    <strong className="myclan-stat-card__value">36</strong>
                </div>

                <div className="myclan-stat-card">
                    <span className="myclan-stat-card__label">Новичков</span>
                    <strong className="myclan-stat-card__value">4</strong>
                </div>

                <div className="myclan-stat-card">
                    <span className="myclan-stat-card__label">В бане</span>
                    <strong className="myclan-stat-card__value">2</strong>
                </div>
            </div>*/}
        </div>
    );
}