import { useState } from "react";
import "../../../StyleSheets/Card.css";
import { Albums } from "./Albums.tsx";
import { albumsStore } from "../../../store/albumsStore.ts";

type TabKey = "cards" | "clan" | "tournaments";

export function CardsPage() {
    const [activeTab] = useState<TabKey>("cards");
    const albums = albumsStore((state) => state.albums);

    return (
        <div className="profile-page">
            {activeTab === "cards" && <Albums albums={albums} />}
        </div>
    );
}