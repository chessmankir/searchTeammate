import { useEffect, useState } from "react";
import type { ClanMember } from "../../../types/ClanMember.ts";
import { useParams } from "react-router-dom";
import type { GameMode, StatusMember } from "../../../store/filtersStore.ts";

export type ProfileFormState = {
    id?: number;
    nickname: string;
    age: string;
    city: string;
    name: string;
    pubgId: string;
    availableMicro: boolean;
    status_game: StatusMember;
    modes: GameMode[];
};

type SaveProfileParams = {
    nickname: string;
    age: string;
    city: string;
    nameMember: string;
    pubgId: string;
    id: number;
    availableMicro: boolean;
    status_game: StatusMember;
    modes: GameMode[];
};

const initialFormState: ProfileFormState = {
    id: undefined,
    nickname: "",
    age: "",
    city: "",
    name: "",
    pubgId: "",
    availableMicro: false,
    status_game: "all",
    modes: [],
};

export function useProfileHooks() {
    const [member, setMember] = useState<ClanMember | undefined>(undefined);
    const [form, setForm] = useState<ProfileFormState>(initialFormState);
    const { pubg_id } = useParams<{ pubg_id?: string }>();

    useEffect(() => {
        const fetchMember = async (): Promise<void> => {
            const params = new URLSearchParams();

            if (pubg_id) {
                params.set("pubg_id", pubg_id);
            } else {
                params.set("pubg_id", "1");
            }

            const url = import.meta.env.VITE_API_URL;
            const backend = `${url}/api/members?${params.toString()}`;

            try {
                const response = await fetch(backend, {
                    credentials: "include",
                });

                const data = await response.json();

                if (data.ok && data.data?.[0]) {
                    const currentMember = data.data[0];

                    setMember(currentMember);

                    setForm({
                        id: currentMember.id,
                        nickname: currentMember.nickname ?? "",
                        pubgId: currentMember.pubg_id ?? "",
                        name: currentMember.name ?? "",
                        age: String(currentMember.age ?? ""),
                        city: currentMember.city ?? "",
                        availableMicro: Boolean(currentMember.available_micro),
                        status_game:
                            currentMember.status_game == null
                                ? "all"
                                : currentMember.status_game,
                        modes: Array.isArray(currentMember.modes)
                            ? currentMember.modes
                            : [],
                    });
                }
            } catch (e) {
                console.log(e);
            }
        };

        void fetchMember();
    }, [pubg_id]);

    const updateForm = <K extends keyof ProfileFormState>(
        key: K,
        value: ProfileFormState[K]
    ): void => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const saveProfile = async ({
                                   nickname,
                                   age,
                                   city,
                                   nameMember,
                                   pubgId,
                                   id,
                                   availableMicro,
                                   status_game,
                                   modes,
                               }: SaveProfileParams): Promise<void> => {
        try {
            const url = import.meta.env.VITE_API_URL;
            const backend = `${url}/api/update/member`;

            const response = await fetch(backend, {
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname,
                    age,
                    city,
                    name: nameMember,
                    pubgId,
                    id,
                    availableMicro,
                    status_game,
                    modes,
                }),
            });

            const data = await response.json();

            if (data.ok) {
                console.log("data");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const saveCurrentProfile = async (): Promise<void> => {
        if (form.id === undefined) return;

        await saveProfile({
            nickname: form.nickname,
            age: form.age,
            city: form.city,
            nameMember: form.name,
            pubgId: form.pubgId,
            id: form.id,
            availableMicro: form.availableMicro,
            status_game: form.status_game,
            modes: form.modes,
        });
    };

    const changeGameModeOption = (option: GameMode): void => {
        if (form.modes.includes(option)) {
            const newOptions = form.modes.filter((item) => item !== option);
            updateForm("modes", newOptions);
        } else {
            updateForm("modes", [...form.modes, option]);
        }
    };

    return {
        member,
        form,
        setForm,
        updateForm,
        saveProfile,
        saveCurrentProfile,
        changeGameModeOption,
    };
}