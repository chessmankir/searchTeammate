import "../../../../StyleSheets/cardDuplicate.css";
import { CardDuplicateHeader } from "./CardDuplicateHeader.tsx";
import { CardDuplicateSelectedCard } from "./CardDuplicateSelectedCard.tsx";
import { CardDuplicateList } from "./CardDuplicateList.tsx";
import { useDuplicatesCard } from "../../../../Hooks/Body/Card/useDuplicatesCard.ts";

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