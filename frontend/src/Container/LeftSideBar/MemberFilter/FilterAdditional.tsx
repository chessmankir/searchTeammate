import {useFiltersStore} from "../../../store/filtersStore.ts";

export function FilterAdditional(){
    const availabeMicro = useFiltersStore((state) => state.availableMicro);
    const setAvailabeMicro = useFiltersStore((state) => state.setAvailableMicro);
    return (
        <div className="filter-block">
            <div className="filter-block__label">Дополнительно</div>
            <label className="check check--mic">
                <input type="checkbox"
                       name="hasMicrophone"
                       onChange={(e) => setAvailabeMicro(e.target.checked)}
                       checked={!!availabeMicro} />
                    <span className="check__text">Наличие микрофона</span>
            </label>
        </div>
    )
}