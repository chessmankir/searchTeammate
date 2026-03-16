import {Album} from "./Album.tsx";

export function Albums({albums}){
    return (
        <div className="cards-layout">
            <section className="album-main">
                <div className="album-main__topbar">
                    <div className="album-main__breadcrumbs">
                        <span>Альбомы</span>
                        {/*    <span className="divider">›</span>*/}
                    </div>
                </div>

                <div className="cards-grid">
                    {albums.map((card) => (
                        <Album card={card} key={card.id} />
                    ))}
                </div>
            </section>

        </div>
    )
}