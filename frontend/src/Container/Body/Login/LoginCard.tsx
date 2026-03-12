import {useState} from "react";
import {LoginSteps} from "./LoginSteps.tsx";
import {LoginRequestStep} from "./LoginRequestStep.tsx";
import {LoginFooter} from "./LoginFooter.tsx";
import {useLoginHook} from "../../../Hooks/Body/LoginHook.ts";
import {LoginVerifyStep} from "./LoginVerifyStep.tsx";

type LoginStep = "request" | "verify";

export function LoginCard(){
    const login = useLoginHook();
    return (
        <div className="login-card">
            <div className="login-card__top">
                <h2 className="login-card__title">Авторизация</h2>
                <p className="login-card__subtitle">
                    {login.step === "request"
                        ? "Введите PUBG ID, чтобы получить код"
                        : "Введите код, который пришёл в Telegram"}
                </p>
            </div>

            <LoginSteps />
            {/*verify*/}
            { login.step === "request" ? (
            <LoginRequestStep
                pubgId={login.pubgId}
                setPubgId={login.setPubgId}
                setStep={login.setStep}
                sendCodeSubmit={login.sendCodeSubmit}
            />
                ) : (<LoginVerifyStep
                        code={login.code}
                        setCode={login.setCode}
                        verifyCodeSubmit={login.verifyCodeSubmit}
                    />) }

          {login.message && <div className="login-card__message login-card__message--success">{login.message}</div>}
            {login.error && <div className="login-card__message login-card__message--error">{login.error}</div>}
            <LoginFooter />
        </div>
    );
}