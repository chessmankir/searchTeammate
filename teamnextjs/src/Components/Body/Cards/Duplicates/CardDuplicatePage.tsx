"use client";

import "@/src/StyleSheets/cardDuplicate.css";
import { CardDuplicateSelectedCard } from "./CardDuplicateSelectedCard.tsx";
import { useDuplicatesCard } from "@/src/Hooks/Body/Card/useDuplicatesCard.ts";
import {CardDuplicateHeader} from "@/src/Components/Body/Cards/Duplicates/CardDuplicateHeader";
import {CardDuplicateList} from "@/src/Components/Body/Cards/Duplicates/CardDuplicateList";

export function CardDuplicatesPage() {
    const { card, members } = useDuplicatesCard();
    const selectedCard = card ?? null;

    return (
        <div className="card-duplicates-page">
            <CardDuplicateHeader />
            <CardDuplicateSelectedCard selectedCard={selectedCard} />
            <CardDuplicateList selectedCard={selectedCard} members={members} />
        </div>
    );
}