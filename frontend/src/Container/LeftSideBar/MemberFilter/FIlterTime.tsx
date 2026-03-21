import {useFiltersStore} from "../../../store/filtersStore.ts";

export function FIlterTime(){
    const timeMode = useFiltersStore().timeMode;
    const toggleTimeMode = useFiltersStore().toggleTimeMode;
    return (
        <div className="filterTime">
            <div className="filter-block">
                <div className="filter-block__label">Время игры</div>
                <label className="check">
                    <input type="checkbox" onChange={()=>toggleTimeMode("morning")} checked={(timeMode.has("morning"))}/>
                    <span>Утро</span>
                </label>
                <label className="check">
                    <input type="checkbox" onChange={()=>toggleTimeMode("day")} checked={(timeMode.has("day"))}/>
                    <span>День</span>
                </label>
                <label className="check">
                    <input type="checkbox" onChange={()=>toggleTimeMode("evening")} checked={(timeMode.has("evening"))}/>
                    <span>Вечер</span>
                </label>
            </div>
        </div>
    )
}