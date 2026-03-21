import {ButtonCard} from "./ButtonCard.tsx";

export function ButtonActions({removeCard, addCard, card, totalCount, quality }): JSX.Element {
    return (

        <div className="quality-control__actions">
       <ButtonCard text={"-"} actionClick={removeCard} cardId={card.id} quality={quality} totalCount={totalCount} />
           {/* <button
                type="button"
                className="quality-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    removeCard(card.id, quality)
                }}
                disabled={totalCount <= 0}
            >
                −
            </button>*/}
            <span className="quality-control__value">{totalCount}</span>
         {/*   <button
                type="button"
                className="quality-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    addCard(card.id, quality)
                }}
            >
                +
            </button>*/}
            <ButtonCard text={"+"} actionClick={addCard} cardId={card.id} quality={quality} totalCount={totalCount} />
        </div>
    )
}