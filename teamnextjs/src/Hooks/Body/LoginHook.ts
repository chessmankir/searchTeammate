"use client";

import { useState } from "react";
import type { LoginStep } from "@/src/types/LoginStep.ts";
import { authStore } from "@/src/Store/authStore";
import {useRouter} from "next/navigation";

export function useLoginHook() {
    const [pubgId, setPubgId] = useState("");
    const [step, setStep] = useState<LoginStep>("request");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const setUser = authStore((state) => state.setUser);
    const navigate = useRouter();

    const sendCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = process.env.NEXT_PUBLIC_API_URL;
        const backendServer = `${url}/api/auth/sendcode`;

        try {
            const response = await fetch(backendServer, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ pubgId }),
            });

            const data = await response.json();

            if (data.ok) {
                //временно
               /* setUser(data.user);
                navigate.push("/players");*/
                //
                setStep("verify");
                setError("");
                setMessage("Введите полученный код от бота @checkmatePubgBot");
            } else {
                setMessage("");
                setError("Данный пользователь не найден");
            }
        } catch (e) {
            console.error(e);
            setMessage("");
            setError("Ошибка отправки кода");
        }
    };

    const verifyCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = process.env.NEXT_PUBLIC_API_URL;
        const backendServer = `${url}/api/auth/verify`;

        try {
            const response = await fetch(backendServer, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ code, pubgId }),
            });

            const data = await response.json();
            console.log(data);
            if (data.ok) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
                setPubgId("");
                setCode("");
                setStep("request");
                setError("");
                setMessage("");
                router.push("/");
            } else {
                setError("Не совпадают данные");
                setMessage("");
            }
        } catch (e) {
            console.log(e);
            setError("Ошибка проверки кода");
            setMessage("");
        }
    };

    return {
        pubgId,
        setPubgId,
        step,
        setStep,
        code,
        setCode,
        verifyCodeSubmit,
        sendCodeSubmit,
        error,
        setError,
        message,
        setMessage,
    };
}