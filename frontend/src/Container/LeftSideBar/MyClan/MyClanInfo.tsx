export function MyClanInfo() {
    return (
        <div className="myclan-sidebar__section">
            <div className="myclan-sidebar__section-title">Сводка</div>

            <div className="myclan-side-stats">
                <div className="myclan-side-stat">
                    <span className="myclan-side-stat__label">Всего</span>
                    <strong className="myclan-side-stat__value">42</strong>
                </div>

                <div className="myclan-side-stat">
                    <span className="myclan-side-stat__label">Онлайн</span>
                    <strong className="myclan-side-stat__value">12</strong>
                </div>

                <div className="myclan-side-stat">
                    <span className="myclan-side-stat__label">Новички</span>
                    <strong className="myclan-side-stat__value">4</strong>
                </div>

                <div className="myclan-side-stat">
                    <span className="myclan-side-stat__label">В бане</span>
                    <strong className="myclan-side-stat__value">2</strong>
                </div>
            </div>
        </div>
    );
}