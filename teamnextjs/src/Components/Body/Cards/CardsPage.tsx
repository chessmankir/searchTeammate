import { useState } from "react";
import "@/src/StyleSheets/Card.css";
import { albumsStore } from "@/src/Store/albumsStore.ts";
import {Albums} from "@/src/Components/Body/Cards/Albums";

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