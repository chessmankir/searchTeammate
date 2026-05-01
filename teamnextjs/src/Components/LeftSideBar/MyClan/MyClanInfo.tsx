import {useMyClanInfoHook} from "../../../Hooks/LeftSideBar/useMyClanInfoHook.ts";

export function MyClanInfo() {
    const {allTotal, freePlaces} = useMyClanInfoHook();
    return (
        <div className="myclan-sidebar__section">
            <div className="myclan-sidebar__section-title">Сводка</div>

            <div className="myclan-side-stats">
                <div className="myclan-side-stat">
                    <span className="myclan-side-stat__label">Всего</span>
                    <strong className="myclan-side-stat__value">{allTotal}</strong>
                </div>
                <div className="myclan-side-stat">
                    <span className="myclan-side-stat__label">Места</span>
                    <strong className="myclan-side-stat__value">{freePlaces}</strong>
                </div>
            </div>
        </div>
    );
}