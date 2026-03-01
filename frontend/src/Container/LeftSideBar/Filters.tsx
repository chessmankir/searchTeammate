import "../../StyleSheets/filters.css";
import {FilterGameMode} from "./FilterGameMode.tsx";
import {FIlterTime} from "./FIlterTime.tsx";
import {FIlterKD} from "./FIlterKD.tsx";
import {FilterAge} from "./FilterAge.tsx"

export function Filters(){
    return (
        <div id="filters">
            <div className="filters">
                <div className="filters__title">Фильтры</div>
                <FilterGameMode />
                <FIlterTime />
                <FilterAge />
            </div>
        </div>
    );
}