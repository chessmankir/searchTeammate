type LoginVerifyProps = {
    code: string;
    setCode: (code: string) => void;
    verifyCodeSubmit: (e: SubmitEvent) => void;
}

export function LoginVerifyStep({code, setCode, verifyCodeSubmit}: LoginVerifyProps) {
    return (
        <form className="login-form" onSubmit={verifyCodeSubmit}>
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
                {/*<button
                    className="login-form__button login-form__button--secondary"
                    type="button"
                    onClick={handleBack}
                >
                    Назад
                </button>*/}

                <button className="login-form__button" type="submit">
                    Войти
                </button>
            </div>
        </form>
    )
}