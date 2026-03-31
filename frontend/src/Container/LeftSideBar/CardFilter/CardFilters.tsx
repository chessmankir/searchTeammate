import "../../../StyleSheets/CardFilter.css";
import { CardFilterTitle } from "./CardFilterTitle.tsx";
import { TypeCardFilterBlock } from "./TypeCardFilterBlock.tsx";
import { ButtonAlbumBLock } from "./ButtonAlbumBLock.tsx";
import { CardFIlterFooter } from "./CardFIlterFooter.tsx";
import type {AlbumType} from "../../../types/AlbumType.ts";


type CardFilterType = "all" | "duplicates" | "missing" | "trades";

type Props = {
    albums: AlbumType[];
    selectedAlbum: number | null;
    setSelectedAlbum: (id: number | null) => void;
    setCardFilter: (value: CardFilterType) => void;
    onReset: () => void;
};

export function CardFilters({
                                albums,
                                selectedAlbum,
                                setSelectedAlbum,
                                setCardFilter,
                                onReset,
                            }: Props) {
    return (
        <aside className="cards-sidebar">
            <div className="cards-sidebar__glow" />
            <CardFilterTitle />

            <ButtonAlbumBLock
                albums={albums}
                selectedAlbum={selectedAlbum}
                setSelectedAlbum={setSelectedAlbum}
            />

            <TypeCardFilterBlock setCardFilter={setCardFilter} />

            <CardFIlterFooter onReset={onReset} />
        </aside>
    );
}