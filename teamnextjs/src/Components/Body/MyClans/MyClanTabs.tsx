import { useNavigate } from "react-router-dom";
import type { MyClan } from "../../../types/MyClan.ts";

type Props = {
    clans: MyClan[];
    currentClan: number;
};

export function MyClanTabs({ clans, currentClan }: Props) {
    const navigate = useNavigate();

    return (
        <div className="myclan-tabs">
            {clans.map((clan) => (
                <button
                    type="button"
                    key={clan.id}
                    className={`myclan-tab ${
                        clan.number === currentClan ? "myclan-tab--active" : ""
                    }`}
                    onClick={() => {
                        navigate(`/myclan?number=${clan.number}`);
                    }}
                >
                    <span className="myclan-tab__name">{clan.name}</span>
                    <span className="myclan-tab__count">{clan.real_count}</span>
                </button>
            ))}
        </div>
    );
}