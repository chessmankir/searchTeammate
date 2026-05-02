import type {Dispatch, FormEvent, SetStateAction} from "react";
import type {LoginStep} from "../../../types/LoginStep.ts";

type LoginRequestStepProps = {
    pubgId: string;
    setPubgId: (pubgId: string) => void;
    sendCodeSubmit: (e: FormEvent<HTMLFormElement>) => void;
    setStep: Dispatch<SetStateAction<LoginStep>>;
}

export function LoginRequestStep({pubgId, setPubgId, sendCodeSubmit}: LoginRequestStepProps) {
    return (
        <form className="login-form" onSubmit={sendCodeSubmit}>
            <label className="login-form__label" htmlFor="pubgId">
                PUBG ID
            </label>

            <input
                id="pubgId"
                className="login-form__input"
                type="text"
                placeholder="Например: 523442956"
                value={pubgId}
                onChange={(e) => setPubgId(e.target.value)}
            />

            <p className="login-form__hint">
                Код будет отправлен в Telegram, привязанный к этому аккаунту.
            </p>

            <button className="login-form__button" type="submit">
                Отправить код
            </button>
        </form>
    )
}