import {RotateCcw} from "lucide-react";

export function CardFIlterFooter(onReset){
    return (
        <div className="cards-sidebar__footer">
            <button className="reset-btn" onClick={onReset} type="button">
                <RotateCcw size={16}/>
                <span>Сбросить фильтры</span>
            </button>
        </div>
    )
}