import {useNavigate} from "react-router-dom";

export  function Album({card}){
    const navigate = useNavigate();
    return (
        <button
            key={card.id}
            className={`collect-card `}
            type="button"
            onClick={() => navigate("/cards/" + card.slug)}
        >
            <div className="collect-card__image-wrap">
                <img
                    className="collect-card__image"
                    src={card.imageSrc}
                    alt={card.name}
                />
            </div>
            <div className="collect-card__footer">
                <span className="collect-card__title">{card.name}</span>
            </div>
        </button>
    )

}