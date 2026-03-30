import { useMemo, useState } from "react";
import "../../../StyleSheets/Card.css";
import {useNavigate} from "react-router-dom";
import {PrfofileTabs} from "../PrfofileTabs.tsx";
import {Albums} from "./Albums.tsx";
import {albumsStore} from "../../../store/albumsStore.ts";

type TabKey = "cards" | "clan" | "tournaments";

function calcPercent(collected: number, total: number) {
    return Math.round((collected / total) * 100);
}

export  function CardsPage() {
    const [activeTab, setActiveTab] = useState<TabKey>("cards");
    const albums = albumsStore((state) => state.albums);

    return (
        <div className="profile-page">

            {/*<PrfofileTabs activeTab={activeTab} setActiveTab={setActiveTab} />*/}

            {activeTab === "cards" && (
               <Albums albums={albums} />
            )}
         {/*   {activeTab === "clan" && (
                <div className="profile-stub">Здесь будет вкладка клана</div>
            )}

            {activeTab === "tournaments" && (
                <div className="profile-stub">Здесь будет вкладка турниров</div>
            )}*/}
        </div>
    );
}