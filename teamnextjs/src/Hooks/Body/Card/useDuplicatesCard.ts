"use client";

import {useEffect, useState} from "react";
import type {CardType} from "@/src/Components/Body/Cards/CardWrapper.tsx";
import {useSearchParams} from "next/navigation";

export function useDuplicatesCard() {
    const [card, setCard] = useState<CardType>();
    const [members, setMembers] = useState([]);
    const searchParams = useSearchParams();

    const card_id = searchParams.get("cardid");

    useEffect( () => {
        const url = process.env.NEXT_PUBLIC_API_URL;
        const backendServer = `${url}/api/card?card_id=${card_id}`;
        (async () => {
            const response = await fetch(backendServer, {
                "credentials": "include",
            });
            const data = await response.json();
            console.log(data.data);
            if(data.ok){
                setCard(data.data);
            }
        })();
    },[card_id]);

    useEffect(() => {
        (async () => {
            const url = process.env.NEXT_PUBLIC_API_URL;
            const backend = `${url}/api/get/usercard?card_id=${card_id}`;
            const response = await fetch(backend, {
                credentials: "include",
            });
            const data = await response.json();
            if(data.ok){
              setMembers(data.data);
            }
        })();
    }, [card_id]);

    return {card, members};
}