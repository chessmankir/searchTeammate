import { authStore } from "../../../store/authStore.ts";

export function useProfileLogout() {
    const setUser = authStore((state) => state.setUser);

    const logout = async (): Promise<boolean> => {
        try {
            const url = import.meta.env.VITE_API_URL;
            const response = await fetch(`${url}/api/logout`, {
                method: "POST",
                credentials: "include",
            });

            const data = await response.json();

            if (data.ok) {
                setUser(null);
                return true;
            }

            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    return { logout };
}