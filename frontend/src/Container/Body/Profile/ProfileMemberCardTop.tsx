export function ProfileMemberCardTop({member}){
    return (
        <div className="profile-player-card__top">
            <div className="profile-player-card__avatar">
                {member?.nickname[0].toUpperCase()}
            </div>

            <div className="profile-player-card__identity">
                <div className="profile-player-card__nickname">
                    {member?.nickname}
                </div>
                <div className="profile-player-card__pubg">
                    PUBG ID: {member?.pubg_id}
                </div>
            </div>
        </div>
    )
}