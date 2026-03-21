export function TypeCardFilter({cardFilter, type, text, setCardFilter}) {
    return (
        <button
            className={`filter-chip ${cardFilter === type ? "active" : ""}`}
            onClick={() => setCardFilter("all")}
            type="button"
        >
            {text}
        </button>
    );
}