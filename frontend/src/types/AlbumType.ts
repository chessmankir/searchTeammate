export interface AlbumType {
    id: number | null;
    name: string;
    slug: string | null;
    imageSrc: string;
    total_cards?: number;
}