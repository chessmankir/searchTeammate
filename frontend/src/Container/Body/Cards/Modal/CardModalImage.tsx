type CardModalImageProps = {
    name: string;
    imageSrc: string;
}

export function CardModalImage({name, imageSrc}: CardModalImageProps) {
    return (
        <div className="card-modal__image-wrap">
            <img
                src={imageSrc}
                alt={name}
                className="card-modal__image"
            />
        </div>
    )
}