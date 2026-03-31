import { RotateCcw } from "lucide-react";

type Props = {
    onReset: () => void;
};

export function CardFIlterFooter({ onReset }: Props) {
    return (
        <div className="cards-sidebar__footer">
            <button className="reset-btn" onClick={onReset} type="button">
                <RotateCcw size={16} />
                <span>Сбросить фильтры</span>
            </button>
        </div>
    );
}