import type { LoginStep } from "../../../types/LoginStep.ts";

type Props = {
    step: LoginStep;
};

export function LoginSteps({ step }: Props) {
    return (
        <div className="login-steps">
            <div
                className={`login-step ${
                    step === "request" ? "is-active" : "is-done"
                }`}
            >
                <span className="login-step__circle">1</span>
                <span className="login-step__label">PUBG ID</span>
            </div>

            <div className="login-steps__line" />

            <div
                className={`login-step ${
                    step === "verify" ? "is-active" : ""
                }`}
            >
                <span className="login-step__circle">2</span>
                <span className="login-step__label">Код</span>
            </div>
        </div>
    );
}