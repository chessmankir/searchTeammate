import type { MyClan } from "@/src/types/MyClan.ts";
import {useRouter} from "next/navigation";

type Props = {
    clans: MyClan[];
    currentClan: number;
};

export function MyClanTabs({ clans, currentClan }: Props) {
    const navigate = useRouter();
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
                        navigate.push(`/myclan?number=${clan.number}`);
                    }}
                >
                    <span className="myclan-tab__name">{clan.title}</span>
                    <span className="myclan-tab__count">{clan.real_count}</span>
                </button>
            ))}
        </div>
    );
}