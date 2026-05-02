import { useEffect } from "react";
import { albumsStore } from "@/src/Store/albumsStore.ts";

export function useLoadAlbums() {
    const albums = albumsStore((state) => state.albums);
    const setAlbums = albumsStore((state) => state.setAlbums);

    useEffect(() => {
        (async () => {
            try {
                const url = process.env.NEXT_PUBLIC_API_URL;
                const backendURL = `${url}/api/albums`;
                const response = await fetch(backendURL);
                const data = await response.json();

                if (data?.ok) {
                    setAlbums(data.data);
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