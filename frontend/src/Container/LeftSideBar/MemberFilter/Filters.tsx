import "../../../StyleSheets/filters.css";
import {FilterGameMode} from "./FilterGameMode.tsx";
import {FilterAge} from "./FilterAge.tsx"
import {FilterStatus} from "./FilterStatus.tsx";
import {FilterAdditional} from "./FilterAdditional.tsx";

export function Filters(){
    return (
        <div id="filters">
            <div className="filters">
                <div className="filters__title">Фильтры</div>
                <FilterGameMode />
                <FilterStatus />
                <FilterAge />
                <FilterAdditional />
            </div>
        </div>
    );
}