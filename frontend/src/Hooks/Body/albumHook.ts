import {useEffect, useState} from "react";

interface AlbumCard  {
    id: number,
    slug: string,
    name: string,
    count: number;
    imageSrc: string
}

export function useAlbums(){

    const [albums, setAlbums] = useState<AlbumCard[]>([]);

    useEffect( ()=> {
        (async () => {
            try{
                const backendURL = "http://localhost:4000/api/albums";
                const response = await fetch(backendURL);
                const data = await response.json();
                console.log(data);
                if(data?.ok){
                    setAlbums([]);
                }
                console.log(data.data);
                setAlbums(data.data);
            }
            catch (e){
                setAlbums([]);
                console.error(e);
            }
        })()
        },([])
    );

    return {albums};
}