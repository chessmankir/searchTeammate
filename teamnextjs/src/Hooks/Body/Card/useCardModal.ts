"use client";

import {useEffect, useState} from "react";
import type {CardType} from "@/src/Components/Body/Cards/CardWrapper.tsx";

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
        setSelectedCard(null);
    };

    const handleTrade = () => {
        if (!selectedCard) return;
        // например переход:
        // navigate(`/cards/${selectedCard.id}/trade`);
    }

    return {selectedCard, setSelectedCard, closeCardModal,  handleTrade};
}