export function ProfileActionButtons({id, saveProfile, nickname, age, city, name, pubgId, availableMicro, status_game, modes}){
    return (
        <div className="profile-actions">
            <button onClick={(e) => {e.preventDefault(); saveProfile(nickname, age, city, name, pubgId, id, availableMicro, status_game, modes)}} className="profile-btn profile-btn--primary">Сохранить</button>
            <button className="profile-btn profile-btn--ghost">Сбросить</button>
        </div>
    )
}