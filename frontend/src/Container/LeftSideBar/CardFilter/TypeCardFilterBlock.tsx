import {TypeCardFilter} from "./TypeCardFilter.tsx";

export function TypeCardFilterBlock({cardFilter, setCardFilter}){
    return (
        <div className="cards-filter-block">
            <div className="cards-filter-block__title">
                <span>Тип карточек</span>
            </div>

            <div className="filter-chips">

                <TypeCardFilter cardFilter={cardFilter} type={"all"} text={"Все"} setCardFilter={setCardFilter}/>
                <TypeCardFilter cardFilter={cardFilter} type={"duplicates"} text={"Дубликаты"}
                                setCardFilter={setCardFilter}/>
                <TypeCardFilter cardFilter={cardFilter} type={"missing"} text={"Отсутствуют"}
                                setCardFilter={setCardFilter}/>
                <TypeCardFilter cardFilter={cardFilter} type={"trades"} text={"Обмены"} setCardFilter={setCardFilter}/>
            </div>
        </div>
    )
}