import "@/src/StyleSheets/cardModal.css";
import {CardType} from "@/src/Components/Body/Cards/CardWrapper";
import {createPortal} from "react-dom";
import {CardModalActions} from "@/src/Components/Body/Cards/Modal/CardModalActions";
import {CardModalImage} from "@/src/Components/Body/Cards/Modal/CardModalImage";

type CardModalProps = {
    closeCardModal: () => void;
    selectedCard: CardType | null;
    handleTrade: (cardId: number) => void;
};

export function CardModal({
                              closeCardModal,
                              selectedCard,
                              handleTrade,
                          }: CardModalProps) {
    // если карточки нет — ничего не рендерим
    if (!selectedCard) return null;

    return createPortal(
        <div className="card-modal-overlay" onClick={closeCardModal}>
            <div className="card-modal" onClick={(e) => e.stopPropagation()}>
                <button className="card-modal__close" onClick={closeCardModal}>
                    ×
                </button>

                <CardModalImage
                    name={selectedCard.name}
                    imageSrc={`/assets/${selectedCard.imageSrc}`}
                />

                <h2 className="card-modal__title">{selectedCard.name}</h2>

                <CardModalActions
                    cardId={selectedCard.id}
                    handleTrade={handleTrade}
                />
            </div>
        </div>,
        document.body
    );
}