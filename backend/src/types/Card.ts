export interface CardQuality {
    quality_id: number;
    count: number;
}

export interface Card {
    id: number;
    name: string;
    imageSrc: string;
    album_id: number;
    qualities: CardQuality[];
}