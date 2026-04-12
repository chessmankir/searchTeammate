import {useEffect, useState} from "react";
import type {CardType} from "../../../Container/Body/Cards/CardWrapper.tsx";

export function useCardModal(){
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

    useEffect(() => {
        if (selectedCard) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedCard]);

    const closeCardModal = () => {
        console.log("Closing CardModal");
        setSelectedCard(null);
    };

    const handleTrade = () => {
        if (!selectedCard) return;
        console.log("Обмен карточки:", selectedCard.id);
        // например переход:
        // navigate(`/cards/${selectedCard.id}/trade`);
    }

    return {selectedCard, setSelectedCard, closeCardModal,  handleTrade};
}