"use client";

import { authStore } from "@/src/Store/authStore";

export function useProfileLogout() {
    const setUser = authStore((state) => state.setUser);

    const logout = async () => {
        try {
            localStorage.removeItem("token");
            setUser(null);
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    return { logout };
}