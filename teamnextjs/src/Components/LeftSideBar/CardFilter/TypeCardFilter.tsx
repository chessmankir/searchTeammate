"use client";

import type { CardFilterType } from "@/src/types/CardFilterType.ts";
import {useRouter, useSearchParams} from "next/navigation";

type Props = {
    type: CardFilterType;
    text: string;
    setCardFilter: (value: CardFilterType) => void;
};

export function TypeCardFilter({ type, text, setCardFilter }: Props) {
    const navigate = useRouter();
    const searchParams = useSearchParams();

    const filter = (searchParams.get("filter") as CardFilterType) || "all";

    return (
        <button
            className={`filter-chip ${filter === type ? "active" : ""}`}
            onClick={(e) => {
                e.preventDefault();
                setCardFilter(type);
                navigate.push(`/cards?filter=${type}`);
            }}
            type="button"
        >
            {text}
        </button>
    );
}