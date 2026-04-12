import "../../../StyleSheets/cardModal.css";
import {createPortal} from "react-dom";

export function CardModal({closeCardModal, selectedCard, handleFind, handleTrade}){
/*
    return createPortal(
        <div className="card-modal-overlay" onClick={closeCardModal}>
            <div
                className="card-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="card-modal__close" onClick={closeCardModal}>
                    ×
                </button>

                <img
                    src={selectedCard.imageSrc}
                    alt={selectedCard.name}
                    className="card-modal__image"
                />
                <h2>{selectedCard.name}</h2>

                <div className="card-modal__actions">
                    <button onClick={handleFind}>Найти</button>
                    <button onClick={handleTrade}>Обмен</button>
                </div>
            </div>
        </div>, document.body
    );
*/

    return createPortal(
        <div className="card-modal-overlay" onClick={closeCardModal}>
            <div className="card-modal" onClick={(e) => e.stopPropagation()}>
                <button className="card-modal__close" onClick={closeCardModal}>
                    ×
                </button>

                <div className="card-modal__image-wrap">
                    <img
                        src={selectedCard.imageSrc}
                        alt={selectedCard.name}
                        className="card-modal__image"
                    />
                </div>

                <h2 className="card-modal__title">{selectedCard.name}</h2>

                <div className="card-modal__actions">
                    <button className="card-modal__button" onClick={handleFind}>
                        Найти
                    </button>
                    <button className="card-modal__button" onClick={handleTrade}>
                        Обмен
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

