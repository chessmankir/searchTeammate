import {useProfileHooks} from "@/src/Hooks/Body/Profile/useProfileHooks.ts";
import {useParams} from "next/navigation";
import {renderHook, waitFor} from "@testing-library/react";

jest.mock("next/navigation", () => ({
    useParams: () => ({
        pubg_id: "575859955"
    })
}));

global.fetch = jest.fn();

describe("useProfileHook", () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockResolvedValue({
            json: async () => ({
                ok: true,
                data: [
                    {
                        id: 1,
                        nickname: "Chessman",
                        pubg_id: "575859955",
                        name: "Кирилл",
                        age: 25,
                        city: "Frankfurt",
                        available_micro: true,
                        status_game: "as",
                        modes: ["classic", "metro"],
                    },
                ]
            })
        })
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Получает профиль и заполняет form", async () => {
        const { result } = renderHook(() => useProfileHooks());

        await waitFor(() => {
            expect(result.current.form.id).toBe(1);
        });

        expect(fetch).toHaveBeenCalled();

        expect(result.current.form).toEqual({
            id: 1,
            nickname: "Chessman",
            pubgId: "575859955",
            name: "Кирилл",
            age: "25",
            city: "Frankfurt",
            availableMicro: true,
            status_game: "as",
            modes: ["classic", "metro"],
        });
    });
})