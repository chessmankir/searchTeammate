export function ProfileMainInformation({isMyProfile, nickname, age, city, name, pubgId, setNickname, setPubgId, setName, setAge, setCity}){
    return (
        <div className="profile-section">
            <div className="profile-section__title">Основная информация</div>

            <div className="profile-form-grid">
                <label className="profile-field">
                    <span>Ник</span>
                    <input type="text" onChange={(e)=> setNickname(e.target.value)} value={nickname} disabled={!isMyProfile}/>
                </label>

                <label className="profile-field">
                    <span>PUBG ID</span>
                    <input type="text" value={pubgId} onChange={(e)=> setPubgId(e.target.value)}/>
                </label>

                <label className="profile-field">
                    <span>Имя</span>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
                </label>

                <label className="profile-field">
                    <span>Возраст</span>
                    <input type="number" value={age} onChange={(e)=> setAge(e.target.value)}/>
                </label>

                <label className="profile-field profile-field--full">
                    <span>Город</span>
                    <input type="text" value={city} onChange={(e)=> setCity(e.target.value)}/>
                </label>
            </div>
        </div>
    );
}