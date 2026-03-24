export function MyClanSearch({totalMembers, searchData, setSearchData}){
    console.log(totalMembers);
    return (
        <div className="myclan-toolbar">
            <div className="myclan-toolbar__left">
                <input
                    className="myclan-input"
                    type="text"
                    placeholder="Поиск по имени, нику или PUBG ID"
                    value={searchData}
                    onChange={(e) => {setSearchData(e.target.value); }}
                />
            </div>
            <div className="myclan-toolbar__right">
                <span className="myclan-toolbar__summary">Показано: {totalMembers}</span>
            </div>
        </div>
    );
}