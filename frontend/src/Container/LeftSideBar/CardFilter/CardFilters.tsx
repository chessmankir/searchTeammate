import "../../../StyleSheets/CardFilter.css";

import "../../../StyleSheets/CardFilter.css";
import { FolderOpen, Filter, RotateCcw } from "lucide-react";
import {CardFilterTitle} from "./CardFilterTitle.tsx"
import {TypeCardFilterBlock} from "./TypeCardFilterBlock.tsx";
import {ButtonAlbumBLock} from "./ButtonAlbumBLock.tsx"
import {CardFIlterFooter} from "./CardFIlterFooter.tsx";

type Album = {
    id: number | null;
    name: string;
    total_cards?: number;
};

type CardFilterType = "all" | "duplicates" | "missing" | "trades";

type Props = {
    albums: Album[];
    selectedAlbum: number | null;
    setSelectedAlbum: (id: number | null) => void;
    cardFilter: CardFilterType;
    setCardFilter: (value: CardFilterType) => void;
    onReset: () => void;
};

export function CardFilters({
    albums, selectedAlbum, setSelectedAlbum, cardFilter, setCardFilter, onReset,}: Props) {

    return (
        <aside className="cards-sidebar">
            <div className="cards-sidebar__glow" />
            <CardFilterTitle />

            <ButtonAlbumBLock albums={albums} selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} />

           <TypeCardFilterBlock cardFilter={cardFilter} setCardFilter={setCardFilter} />

            <CardFIlterFooter onReset={onReset}/>
        </aside>
    );
}