import { useState } from "react";
import type { LoginStep } from "../../types/LoginStep.ts";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore.ts";

export function useLoginHook() {
    const [pubgId, setPubgId] = useState("");
    const [step, setStep] = useState<LoginStep>("request");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const setUser = authStore((state) => state.setUser);
    const navigate = useNavigate();

    const sendCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const backendServer = "/api/sendcode";

        try {
            const response = await fetch(backendServer, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ pubgId }),
            });

            const data = await response.json();

            if (data.ok) {
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

        const backendServer = "/api/verifycode";

        try {
            const response = await fetch(backendServer, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ code, pubgId }),
            });

            const data = await response.json();

            if (data.ok) {
                setUser(data.user);
                navigate("/players");
                setPubgId("");
                setCode("");
                setStep("request");
                setError("");
                setMessage("");
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