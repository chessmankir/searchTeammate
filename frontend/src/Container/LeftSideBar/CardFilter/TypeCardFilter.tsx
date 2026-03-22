import {useNavigate, useSearchParams} from "react-router-dom";

export function TypeCardFilter({ type, text, setCardFilter}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter") || "all";
    return (
        <button
            className={`filter-chip ${filter === type ? "active" : ""}`}
            onClick={(e) => { e.preventDefault();
                setCardFilter("all"); navigate(`/cards?filter=${type}`);  }}
            type="button"
        >
            {text}
        </button>
    );
}