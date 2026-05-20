"use client";

import { useEffect } from "react";
import { albumsStore } from "@/src/Store/albumsStore";

export function useLoadAlbums() {
    const albums = albumsStore((state) => state.albums);
    const setAlbums = albumsStore((state) => state.setAlbums);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                const url = process.env.NEXT_PUBLIC_API_URL;
                const backendURL = `${url}/api/card/albums`;
                console.log(backendURL);
                const response = await fetch(backendURL,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data?.ok) {
                    setAlbums(data.albums);
                } else {
                    setAlbums([]);
                }
            } catch (e) {
                setAlbums([]);
                console.error(e);
            }
        })();
    }, []);

    return { albums };
}