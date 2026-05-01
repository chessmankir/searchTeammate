import { TypeCardFilter } from "./TypeCardFilter.tsx";
import type { CardFilterType } from "../../../types/CardFilterType.ts";

type TypeCardFilterBlockProps = {
    setCardFilter: (value: CardFilterType) => void;
};

export function TypeCardFilterBlock({ setCardFilter }: TypeCardFilterBlockProps) {
    return (
        <div className="cards-filter-block">
            <div className="cards-filter-block__title">
                <span>Тип карточек</span>
            </div>

            <div className="filter-chips">
                <TypeCardFilter type="all" text="Все" setCardFilter={setCardFilter} />
                <TypeCardFilter type="duplicates" text="Дубликаты" setCardFilter={setCardFilter} />
                <TypeCardFilter type="missing" text="Отсутствуют" setCardFilter={setCardFilter} />
                <TypeCardFilter type="trades" text="Обмены" setCardFilter={setCardFilter} />
            </div>
        </div>
    );
}