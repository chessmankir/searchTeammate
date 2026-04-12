import { useFiltersStore, type StatusMember } from "../../../store/filtersStore.ts";

export function FilterStatus() {
    const status = useFiltersStore((state) => state.status);
    const setStatus = useFiltersStore((state) => state.setStatus);

    const handleChange = (value: StatusMember) => {
        setStatus(value);
    };

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
                        onChange={() => handleChange("all")}
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
                        onChange={() => handleChange("as")}
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
                        onChange={() => handleChange("asm")}
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
                        onChange={() => handleChange("asd")}
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
                        onChange={() => handleChange("zavic")}
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
                        onChange={() => handleChange("legend")}
                    />
                    <span className="radio-card__control"></span>
                    <span className="radio-card__text">Апаю Легенду</span>
                </label>
            </div>
        </div>
    );
}