import { useFiltersStore } from "../../../store/filtersStore.ts";

export function FilterStatus() {
    const status = useFiltersStore((state) => state.status);
    const setStatus = useFiltersStore((state) => state.setStatus);

    return (
        <div className="filter-block">
            <div className="filter-block__label">Статус</div>

            <div className="radio-group">

                <label className="radio-card">
                    <input
                        type="radio"
                        name="status"
                        value="all"
                        checked={status === "all"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <span className="radio-card__control"></span>
                    <span className="radio-card__text">Любой</span>
                </label>

                <label className="radio-card">
                    <input
                        type="radio"
                        name="status"
                        value="as"
                        checked={status === "as"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <span className="radio-card__control"></span>
                    <span className="radio-card__text">Продвижение Ас</span>
                </label>

                <label className="radio-card">
                    <input
                        type="radio"
                        name="status"
                        value="asm"
                        checked={status === "asm"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <span className="radio-card__control"></span>
                    <span className="radio-card__text">Продвижение Ас-мастер</span>
                </label>

                <label className="radio-card">
                    <input
                        type="radio"
                        name="status"
                        value="asd"
                        checked={status === "asd"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <span className="radio-card__control"></span>
                    <span className="radio-card__text">Продвижение Ас-доминатора</span>
                </label>

                <label className="radio-card">
                    <input
                        type="radio"
                        name="status"
                        value="zavic"
                        checked={status === "zavic"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <span className="radio-card__control"></span>
                    <span className="radio-card__text">Апаю завика</span>
                </label>

                <label className="radio-card">
                    <input
                        type="radio"
                        name="status"
                        value="legend"
                        checked={status === "legend"}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <span className="radio-card__control"></span>
                    <span className="radio-card__text">Апаю Легенду</span>
                </label>

            </div>
        </div>
    );
}