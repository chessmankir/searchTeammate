import {useEffect, useState} from "react";
import type {CardType} from "../../../Container/Body/Cards/CardWrapper.tsx";
import {useNavigate} from "react-router-dom";

export function useCardModal(){
    const [selectedCard, setSelectedCard] = useState<CardType>();

    const openCardModal = (card: CardType) => {
        setSelectedCard(card);
    };

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

    const handleFind = () => {
        if (!selectedCard) return;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const navigate = useNavigate();
        console.log("Найти карточку:", selectedCard.id);
        navigate(`/duplicates?card=${selectedCard.id}`);
    };

    const handleTrade = () => {
        if (!selectedCard) return;
        console.log("Обмен карточки:", selectedCard.id);
        // например переход:
        // navigate(`/cards/${selectedCard.id}/trade`);

    }

    return {selectedCard, setSelectedCard, closeCardModal,  handleTrade};
}