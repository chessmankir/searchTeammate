import { Link } from "react-router-dom";
import type { CardType } from "../CardWrapper.tsx";

type MissingCard = {
    id: number;
    name: string;
    imageSrc: string;
};

type DuplicateMember = {
    id: number;
    name: string;
    nickname: string;
    profile_link: string;
    pubg_id: string;
    missing_cards: MissingCard[];
};

type CardDuplicateListProps = {
    members: DuplicateMember[];
    selectedCard: CardType | null;
};

export function CardDuplicateList({
                                      members,
                                      selectedCard,
                                  }: CardDuplicateListProps) {
    console.log(members);
    return (
        <div className="card-duplicates-page__table-wrap">
            <table className="card-duplicates-page__table">
                <thead>
                <tr>
                    <th>Карточка</th>
                    <th>Имя</th>
                    <th>Ник в игре</th>
                    <th>Ищет</th>
                    <th>Профиль</th>
                </tr>
                </thead>

                <tbody>
                {members.map((row) => (
                    <tr key={row.id}>
                        <td>
                            <div className="card-cell">
                                {selectedCard && (
                                    <img
                                        src={selectedCard.imageSrc}
                                        alt={selectedCard.name}
                                        className="card-cell__image"
                                    />
                                )}

                                <div className="card-cell__content">
                                    <div className="card-cell__title">
                                        {selectedCard?.name ?? "Карточка не выбрана"}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className="user-cell">{row.name}</div>
                        </td>

                        <td>
                            <div className="game-cell">{row.nickname}</div>
                        </td>

                        <td>
                            <div className="wants-cell">
                                {row.missing_cards.map((want: MissingCard) => (
                                    <img
                                        key={want.id}
                                        src={want.imageSrc}
                                        alt={want.name}
                                        className="card-cell__image"
                                        title={want.name}
                                    />
                                ))}
                            </div>
                        </td>

                        <td>
                            <Link to={`/profile/`+row.pubg_id} className="profile-link">
                                Профиль
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}