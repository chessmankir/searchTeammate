import { useNavigate } from "react-router-dom";
import type { MyClan } from "../../../types/MyClan.ts";

type MyClanSidebarClanProps = {
    clans: MyClan[];
    currentClan: number;
};

export function MyClanSidebarClan({
                                      clans,
                                      currentClan,
                                  }: MyClanSidebarClanProps) {
    const navigate = useNavigate();

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
                        onClick={() => navigate(`/myclan?number=${clan.number}`)}
                    >
                        <span>{clan.title}</span>
                        <span className="myclan-clan-item__count">{clan.real_count}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}