import "../../../../StyleSheets/cardModal.css";
import {createPortal} from "react-dom";
import {CardModalActions} from "./CardModalActions.tsx";
import {CardModalImage} from "./CardModalImage.tsx";

export function CardModal({closeCardModal, selectedCard, handleTrade}){
    console.log(selectedCard);
    return createPortal(
        <div className="card-modal-overlay" onClick={closeCardModal}>
            <div className="card-modal" onClick={(e) => e.stopPropagation()}>
                <button className="card-modal__close" onClick={closeCardModal}>
                    ×
                </button>

                <CardModalImage name={selectedCard.name} imageSrc={selectedCard.imageSrc} />

                <h2 className="card-modal__title">{selectedCard.name}</h2>

               <CardModalActions cardId={selectedCard.id}  handleTrade={handleTrade} />
            </div>
        </div>,
        document.body
    );
}

