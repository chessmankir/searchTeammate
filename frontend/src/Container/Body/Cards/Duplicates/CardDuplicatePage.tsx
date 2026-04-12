import { Link } from "react-router-dom";
import "../../../../StyleSheets/cardDuplicate.css";
import {CardDuplicateCard} from "./CardDuplicateCard.tsx";
import {CardDuplicateSelectedCard} from "./CardDuplicateSelectedCard.tsx";
import {CardDuplicateList} from "./CardDuplicateList.tsx";

type DuplicateRow = {
    id: number;
    card_name: string;
    card_image: string;
    owner_nickname: string;
    game_nickname: string;
    wants: string[];
    profile_link: string;
};

export function CardDuplicatesPage() {
   const album_name = "Альбом";

    const selectedCard = {
        id: 1,
        name: "Golden Pharaoh",
        imageSrc: "/assets/Cards/universe7.PNG",
        album_name: "Ancient Egypt",
    };

    const mockRows: DuplicateRow[] = [
        {
            id: 1,
            card_name: "Golden Pharaoh",
            card_image: "/assets/Cards/universe7.PNG",
            owner_nickname: "ChessmanKir",
            game_nickname: "ChessmanKirPUBG",
            wants: ["Cyber Samurai", "Dragon Fire", "Storm Lord"],
            profile_link: "/profile/51984492416",
        },
        {
            id: 2,
            card_name: "Golden Pharaoh",
            card_image: "/assets/Cards/universe7.PNG",
            owner_nickname: "RushKing",
            game_nickname: "RushKing_X",
            wants: ["Ice Queen", "Dark Raven"],
            profile_link: "/profile/12345678901",
        },
        {
            id: 3,
            card_name: "Golden Pharaoh",
            card_image: "/assets/Cards/universe7.PNG",
            owner_nickname: "SniperPro",
            game_nickname: "SNP_Elite",
            wants: ["Thunder God", "Cyber Samurai", "Ghost Mask"],
            profile_link: "/profile/77788899911",
        },
    ];

    return (
        <div className="card-duplicates-page">
            <CardDuplicateCard />
            <CardDuplicateSelectedCard selectedCard={selectedCard} album_name={album_name} />
            <CardDuplicateList members={mockRows} />
        </div>
    );
}