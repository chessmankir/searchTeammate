import {Logo} from "../Logo.tsx";
import {CardFilters} from "../CardFilter/CardFilters";

export function CardFilterWrapper(){
    const  selectedAlbum = ""
    const  cardFilter = "all";
    function setSelectedAlbum() {}
    function setCardFilter() {}
    function onReset() {}

    return (
        <div id="left-side-bar">
            <Logo/>
            <CardFilters
                albums={[
                    { id: 1, name: "Годовщина", count: 48 },
                    { id: 2, name: "Магическая битва", count: 24 },
                    { id: 3, name: "PMGC", count: 12 },
                    { id: 4, name: "Вселенная", count: 31 },
                ]}
                selectedAlbum={selectedAlbum}
                setSelectedAlbum={setSelectedAlbum}
                cardFilter={cardFilter}
                setCardFilter={setCardFilter}
                onReset={onReset}
            />
        </div>
    )
}