import {useFiltersStore} from "../../../store/filtersStore.ts";

export function FilterAdditional(){
    const availabeMicro = useFiltersStore((state) => state.availableMicro);
    const setAvailabeMicro = useFiltersStore((state) => state.setAvailableMicro);
    return (
        <div class="filter-block">
            <div class="filter-block__label">Дополнительно</div>
            <label class="check check--mic">
                <input type="checkbox"
                       name="hasMicrophone"
                       onChange={(e) => setAvailabeMicro(e.target.checked)}
                       value={!!availabeMicro} />
                    <span class="check__text">Наличие микрофона</span>
            </label>
        </div>
    )
}