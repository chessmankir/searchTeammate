import {Link} from "react-router-dom";

export function CardDuplicateList({members, selectedCard}){
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
                                <img
                                    src={selectedCard?.imageSrc}
                                    alt={selectedCard?.name}
                                    className="card-cell__image"
                                />
                                <div className="card-cell__content">
                                    <div className="card-cell__title">
                                        {selectedCard?.name}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className="user-cell">
                                {row?.name}
                            </div>
                        </td>

                        <td>
                            <div className="game-cell">
                                {row?.nickname}
                            </div>
                        </td>

                        <td>
                            <div className="wants-cell">
                                {row.missing_cards.map((want, index) => (
                                   /* <span key={index} className="wants-cell__tag">
                                                {want.name}
                                            </span>*/
                                        <img src={want.imageSrc} alt={want.name} className="card-cell__image" />
                                ))}
                            </div>
                        </td>

                        <td>
                            <Link
                                to={row.profile_link}
                                className="profile-link"
                            >
                                Профиль
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}