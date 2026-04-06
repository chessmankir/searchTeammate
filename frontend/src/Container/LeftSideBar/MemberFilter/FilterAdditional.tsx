export function FilterAdditional(){
    return (
        <div class="filter-block">
            <div class="filter-block__label">Дополнительно</div>
            <label class="check check--mic">
                <input type="checkbox" name="hasMicrophone" />
                    <span class="check__text">Наличие микрофона</span>
            </label>
        </div>
    )
}