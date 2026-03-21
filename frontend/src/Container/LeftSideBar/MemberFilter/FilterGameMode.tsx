import { useFiltersStore } from "../../../store/filtersStore.tsx";

export function FilterGameMode() {

    const mode = useFiltersStore((s) => s.mode);
    const toggleMode = useFiltersStore((s) => s.toggleMode);

    return (
        <div className="filter-game-mode">
            <div className="filter-block">
                <div className="filter-block__label">Режим</div>
                <div className="segmented">

                    <button
                        onClick={() => toggleMode("classic")}
                        className={(mode == "classic") ? "segmented__btn is-active" : "segmented__btn"}
                        type="button"
                    >
                        Классика
                    </button>

                    <button
                        onClick={() => toggleMode("metro")}
                        className={(mode == "metro") ? "segmented__btn is-active" : "segmented__btn"}
                        type="button"
                    >
                        Metro
                    </button>

                    <button
                        onClick={() => toggleMode("tdm")}
                        className={(mode == "tdm") ? "segmented__btn is-active" : "segmented__btn"}
                        type="button"
                    >
                        TDM
                    </button>

                </div>
            </div>
        </div>
    );
}