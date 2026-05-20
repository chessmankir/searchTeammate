import {useProfileHooks} from "./useProfileHooks.ts";

global.fetch = jest.fn();

function Wrapper ({children}: {children: ReactNode}) {
    return (
        <MemoryRouter initialEntries={["/profile/575859955"]}>
            <Routes>
                <Route path="/profile/:pubg_id" element={children} />
            </Routes>
        </MemoryRouter>
    )
}

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
        const {result} = renderHook(() => useProfileHooks(), {wrapper: Wrapper});

        await waitFor(() => {
            expect(result.current.form.id).toBe(1);
        })

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
        })
    })
})