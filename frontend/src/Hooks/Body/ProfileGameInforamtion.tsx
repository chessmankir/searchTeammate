export function ProfileGameInforamtion({isMyProfile, changeGameModeOption, availableMicro, setAvailableMicro, modes, setModes, status_game, setStatus_game}){
    return (
        <div className="profile-section">
            <div className="profile-section__title">Игровая информация</div>

            <div className="profile-form-grid">
                <div className="profile-field profile-field--full">
                    <span>Режимы</span>
                    <div className="profile-modes">
                        <button onClick={() => {changeGameModeOption(modes, "classic", setModes)}}
                                className={modes?.includes('classic') ? "profile-mode-chip is-active" : "profile-mode-chip"} type="button">Классика
                        </button>
                        <button onClick={() => {changeGameModeOption(modes, "metro", setModes)}}
                                className={modes?.includes('metro') ? "profile-mode-chip is-active" : "profile-mode-chip"} type="button">Metro</button>
                        <button onClick={() => {changeGameModeOption(modes, "tdm", setModes)}}
                                className={modes?.includes('tdm') ? "profile-mode-chip is-active" : "profile-mode-chip"} type="button">TDM</button>
                        <button onClick={() => {changeGameModeOption(modes, "ultimate", setModes)}}
                                className={modes?.includes('ultimate') ? "profile-mode-chip is-active" : "profile-mode-chip"} type="button">Ultimate
                            Royale
                        </button>
                    </div>
                </div>

                <label className="profile-field">
                    <span>Статус</span>
                    <select disabled={!isMyProfile} value={status_game} onChange={(e) => setStatus_game(e.target.value)}>
                        <option value="all">Любой</option>
                        <option value="as">Продвижение Ас</option>
                        <option value="asm">Продвижение Ас-мастер</option>
                        <option value="asd">Продвижение Ас-доминатора</option>
                        <option value="zavic">Апаю завика</option>
                        <option value="legend">Апаю Легенду</option>
                    </select>
                </label>

                <label className="profile-field">
                    <span>Микрофон</span>
                    <label className="profile-check">
                        <input type="checkbox" value={availableMicro}
                               onChange={(e) => setAvailableMicro(e.target.value)} disabled={!isMyProfile}/>
                        <span>Есть микрофон</span>
                    </label>
                </label>
            </div>
        </div>
    )
}