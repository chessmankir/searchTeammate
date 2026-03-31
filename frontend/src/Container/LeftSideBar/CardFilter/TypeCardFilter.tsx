import { useNavigate, useSearchParams } from "react-router-dom";
import type { CardFilterType } from "../../../types/CardFilterType.ts";

type Props = {
    type: CardFilterType;
    text: string;
    setCardFilter: (value: CardFilterType) => void;
};

export function TypeCardFilter({ type, text, setCardFilter }: Props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const filter = (searchParams.get("filter") as CardFilterType) || "all";

    return (
        <button
            className={`filter-chip ${filter === type ? "active" : ""}`}
            onClick={(e) => {
                e.preventDefault();
                setCardFilter(type); // ✅ исправлено
                navigate(`/cards?filter=${type}`);
            }}
            type="button"
        >
            {text}
        </button>
    );
}