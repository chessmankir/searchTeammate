import {Card} from "../../types/Card";

type CardRow = {
    id: number;
    name: string;
    imageSrc?: string;
    imagesrc?: string;
    album_id: number;
    quality_id: number | null;
    count: number | null;
};

export function mapCardRows(rows: CardRow[]): Card[] {
    const cards = new Map<number, Card>();
    console.log("mapCardRows");
    for (const row of rows) {
        let card = cards.get(row.id);

        if (!card) {
            card = {
                id: Number(row.id),
                name: row.name,
                imageSrc: row.imageSrc ?? row.imagesrc ?? "",
                album_id: row.album_id,
                qualities: []
            };

            cards.set(row.id, card);
        }

        if (row.quality_id !== null) {
            card.qualities.push({
                quality_id: row.quality_id,
                count: row.count ?? 0
            });
        }
    }

    return Array.from(cards.values());
}