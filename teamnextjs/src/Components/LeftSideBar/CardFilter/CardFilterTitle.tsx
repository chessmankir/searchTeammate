import {Filter} from "lucide-react";

export function CardFilterTitle(){
    return (
        <div className="cards-sidebar__header">
            <div className="cards-sidebar__icon">
                <Filter size={18}/>
            </div>

            <div>
                <h3>Фильтры</h3>
            </div>
        </div>
    )
}