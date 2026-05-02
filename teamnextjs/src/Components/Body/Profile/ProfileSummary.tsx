export function ProfileSummary(){
    return (
        <div className="player-summary__stats">
            <div className="player-summary__row">
                <span>Статус</span>
                <strong>Ищу тиммейтов</strong>
            </div>

            <div className="player-summary__row">
                <span>Клан</span>
                <strong>Checkmate</strong>
            </div>

            <div className="player-summary__row">
                <span>Telegram</span>
                <strong>@chessmankir</strong>
            </div>

          {/*  <div className="player-summary__row player-summary__row--column">
                <span>Режимы</span>
                <div className="profile-tags">
                    <span className="profile-tag">Классика</span>
                    <span className="profile-tag">Metro</span>
                    <span className="profile-tag">Ultimate Royale</span>
                </div>
            </div>

            <div className="player-summary__row">
                <span>Микрофон</span>
                <strong>Есть</strong>
            </div>*/}
        </div>
    )
}