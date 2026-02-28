export function FIlterTime(){
    return (
        <div className="filterTime">
            <div className="filter-block">
                <div className="filter-block__label">Время игры</div>
                <label className="check">
                    <input type="checkbox"/>
                    <span>Утро</span>
                </label>
                <label className="check">
                    <input type="checkbox"/>
                    <span>День</span>
                </label>
                <label className="check">
                    <input type="checkbox"/>
                    <span>Вечер</span>
                </label>
            </div>
        </div>
    )
}