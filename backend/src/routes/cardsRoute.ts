import {Router, Request, Response} from 'express';
import {pool} from '../db/db';
import {Card} from "../../types/Card";

const router = Router();
router.get('/:albumid', async (req: Request, res: Response) => {
    const {albumid} = req.params;
    const userid = req.query.userid;
    const query = `
            SELECT c.*, uc.id_user,
                    uc.quality_id,
                    uc.count
            FROM cards c
            JOIN albums a ON a.id = c.album_id
            LEFT JOIN user_card uc ON uc.card_id = c.id 
                AND uc.id_user = $2
            WHERE a.slug = $1
            ORDER BY c.id ASC
            LIMIT 30
        `;
    try{
        const responseAnswer = await pool.query(query,[albumid,userid]);
        const cards = new Map<Card>();
        if(!responseAnswer?.rows){
            return res.json({
                ok: false,
            })
        }
        for (const row of responseAnswer.rows) {
            let card = cards.get(row.id);

            if (!card) {
                card = {
                    id: Number(row.id),
                    name: row.name,
                    imageSrc: row.imageSrc,
                    album_id: row.album_id,
                    qualities: []
                };
                cards.set(row.id, card);
            }

            if (row.quality_id !== null) {
                card.qualities.push({
                    quality_id: row.quality_id,
                    count: row.count
                });
            }
        }
        return res.json({
            ok: true,
            data: Array.from(cards.values())
        });


    }
    catch(err){
        console.log(err);
        return res.json({
            ok: false
        });
    }
});

export default router;