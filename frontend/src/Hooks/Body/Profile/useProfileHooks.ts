import { useEffect, useState } from "react";
import type { ClanMember } from "../../../types/ClanMember.ts";
import { useParams } from "react-router-dom";
import type {GameMode, StatusMember} from "../../../store/filtersStore.ts";

export function useProfileHooks() {
    const [member, setMember] = useState<ClanMember>();
    const { pubg_id } = useParams();
    const [nickname, setNickname] = useState("");
    const [pubgId, setPubgId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [modes, setModes] = useState<GameMode[]>([]);
    const [availableMicro, setAvailableMicro] = useState(false);
    const [status_game, setStatus_game] = useState<StatusMember>("all");
    const [id, setId] = useState();

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams();

            if (pubg_id) {
                params.set("pubg_id", pubg_id);
            } else {
                params.set("pubg_id", "1");
            }
            const url = import.meta.env.VITE_API_URL;
            const backend = `${url}/api/members?` + params.toString();

            try {
                const response = await fetch(backend, {
                    credentials: "include",
                });

                const data = await response.json();

                if (data.ok) {
                  /*  if (pubg_id) {*/
                        setMember(data.data[0]);
                        setNickname(data.data[0].nickname);
                        setPubgId(data.data[0].pubg_id);
                        setName(data.data[0].name);
                        setAge(data.data[0].age);
                        setCity(data.data[0].city);
                        setAvailableMicro(data.data[0].available_micro);
                        setStatus_game(data.data[0].status_game == null ? "all" : data.data[0].status_game);
                        setModes(data.data[0].modes);
                        setId(data.data[0].id);
                   /* } else {
                        setMember({ ...data.data[0], owner: true });
                    }*/
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [pubg_id]);

    const saveProfile = async function (nickname, age, city, nameMember, pubgId, id, availableMicro, status_game, modes) {
        try{
            const url = import.meta.env.VITE_API_URL;
            const backend = `${url}/api/update/member`;
            const response = await fetch(backend, {
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: nickname,
                    age: age,
                    city: city,
                    name: nameMember,
                    pubgId: pubgId,
                    id: id,
                    availableMicro: availableMicro,
                    status_game: status_game,
                    modes: modes,
                })
            });
            const data = await response.json();
            if (data.ok) {
                console.log('data');
            }
        }
        catch (e){
            console.log(e);
        }
    }

    const changeGameModeOption = function (modes, option, setModes){
        console.log(option);
        if(modes.includes(option)){
            const newOptions = modes.filter((item) => {
                console.log(item);
                return item != option;
            });
            setModes(newOptions);
        }
        else{
            const newOptions = [...modes, option];
            setModes(newOptions);
        }
    }

    return { member, nickname, age, city, name, pubgId, id, status_game, setNickname, setPubgId, setName, setAge, setCity,
        availableMicro, setAvailableMicro, modes, setModes,  setStatus_game, saveProfile, changeGameModeOption};
}

