import {useState} from "react";
type LoginStep = "request" | "verify";

export function LoginCard(){
    const [pubgId, setPubgId] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState<LoginStep>("request");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSendCode(e: React.FormEvent<HTMLFormElement>) {

    }

    async function handleVerifyCode(e: React.FormEvent<HTMLFormElement>) {

    }

    function handleBack() {
        setStep("request");
        setCode("");
        setMessage("");
        setError("");
    }

    return (
        <div className="login-card">
            <div className="login-card__top">
                <h2 className="login-card__title">Авторизация</h2>
                <p className="login-card__subtitle">
                    {step === "request"
                        ? "Введите PUBG ID, чтобы получить код"
                        : "Введите код, который пришёл в Telegram"}
                </p>
            </div>

            <div className="login-steps">
                <div className={`login-step ${step === "request" ? "is-active" : "is-done"}`}>
                    <span className="login-step__circle">1</span>
                    <span className="login-step__label">PUBG ID</span>
                </div>

                <div className="login-steps__line"/>

                <div className={`login-step ${step === "verify" ? "is-active" : ""}`}>
                    <span className="login-step__circle">2</span>
                    <span className="login-step__label">Код</span>
                </div>
            </div>

            {step === "request" && (
                <form className="login-form" onSubmit={handleSendCode}>
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
            )}

            {step === "verify" && (
                <form className="login-form" onSubmit={handleVerifyCode}>
                    <label className="login-form__label" htmlFor="code">
                        Код из Telegram
                    </label>

                    <input
                        id="code"
                        className="login-form__input login-form__input--code"
                        type="text"
                        placeholder="Введите код"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <p className="login-form__hint">
                        Если код не пришёл, проверь что ты запускал бота и аккаунт привязан.
                    </p>

                    <div className="login-form__actions">
                        <button
                            className="login-form__button login-form__button--secondary"
                            type="button"
                            onClick={handleBack}
                        >
                            Назад
                        </button>

                        <button className="login-form__button" type="submit">
                            Войти
                        </button>
                    </div>
                </form>
            )}

            {message && <div className="login-card__message login-card__message--success">{message}</div>}
            {error && <div className="login-card__message login-card__message--error">{error}</div>}

            <div className="login-card__footer">
                <span className="login-card__footer-title">Нет привязки Telegram?</span>
                <p className="login-card__footer-text">
                    Сначала напиши боту <strong>/start</strong>, чтобы он мог отправить код.
                </p>
            </div>
        </div>
    );
}