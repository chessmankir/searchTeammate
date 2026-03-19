export interface Card{
    id: number,
    name: string,
    imgSrc: string,
    qualities: {
        name: string,
        count: number,
    }
}