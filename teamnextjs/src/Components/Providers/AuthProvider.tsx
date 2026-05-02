"use client";

import {ReactNode, useEffect} from "react";
import {authStore} from "@/src/Store/authStore";

export function AuthProvider({ children }: { children: ReactNode }) {
    const checkAuth = authStore((state) => state.checkAuth);
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    return(
        <>
            {children}
        </>
    )
}