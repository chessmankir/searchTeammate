import {ButtonActions} from "./ButtonActions.tsx";

export function CardEditorPanel({removeCard, addCard, card, commonCount, rareCount, legendaryCount, QUALITY}) {
    return (
        <div className="album-card__editor">
            <div className="quality-control quality-control--common">
                <span className="quality-control__label">Обычная</span>
                <ButtonActions card={card} removeCard={removeCard} totalCount={commonCount} addCard={addCard} quality={QUALITY.COMMON} />
            </div>

            <div className="quality-control quality-control--rare">
                <span className="quality-control__label">Синяя</span>
                <ButtonActions card={card} removeCard={removeCard} totalCount={rareCount} addCard={addCard} quality={QUALITY.RARE} />
            </div>

            <div className="quality-control quality-control--legendary">
                <span className="quality-control__label">Золотая</span>
                <ButtonActions card={card} removeCard={removeCard} totalCount={legendaryCount} addCard={addCard} quality={QUALITY.LEGENDARY} />
            </div>
        </div>
    );
}