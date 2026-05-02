import type { Dispatch, SetStateAction } from "react";

type TabKey = "cards" | "clan" | "tournaments";

type Props = {
    activeTab: TabKey;
    setActiveTab: Dispatch<SetStateAction<TabKey>>;
};

export function PrfofileTabs({ activeTab, setActiveTab }: Props) {
    return (
        <div className="profile-tabs-wrap">
            <div className="profile-tabs">
                <button
                    className={activeTab === "cards" ? "profile-tab active" : "profile-tab"}
                    onClick={() => setActiveTab("cards")}
                    type="button"
                >
                    <span className="profile-tab__icon">◈</span>
                    <span className="profile-tab__text">Карты</span>
                </button>

                <button
                    className={activeTab === "clan" ? "profile-tab active" : "profile-tab"}
                    onClick={() => setActiveTab("clan")}
                    type="button"
                >
                    <span className="profile-tab__icon">✦</span>
                    <span className="profile-tab__text">Клан</span>
                </button>

                <button
                    className={activeTab === "tournaments" ? "profile-tab active" : "profile-tab"}
                    onClick={() => setActiveTab("tournaments")}
                    type="button"
                >
                    <span className="profile-tab__icon">◆</span>
                    <span className="profile-tab__text">Турниры</span>
                </button>
            </div>
        </div>
    );
}